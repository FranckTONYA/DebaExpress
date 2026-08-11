import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pg from 'pg'; 
import { PrismaPg } from '@prisma/adapter-pg'; 
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Importations locales avec extensions .js obligatoires pour ESM/NodeNext
import { PrismaClient } from './generated/client/client.js';
import { verifierToken, autoriserRoles } from './middlewares/auth.js';
import type { UserRequest } from './middlewares/auth.js';

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error("🚨 Erreur critique : DATABASE_URL n'est pas définie dans le fichier .env");
}

const app = express();
const PORT = process.env.PORT || 3000;

// Configuration de la connexion brute et de l'adaptateur requis par Prisma 7
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

app.use(cors());
app.use(express.json());

// 🔍 Route de diagnostic global
app.get('/api/status', (req, res) => {
  res.json({ message: "Le serveur Deba Express fonctionne parfaitement sous Prisma 7 !" });
});

// =========================================================================
// 🚪 SECTION AUTHENTIFICATION & COMPTES
// =========================================================================

// Route de connexion (Génération du Jeton JWT)
app.post('/api/auth/connexion', async (req, res) => {
  const { email, motDePasse } = req.body;

  try {
    const utilisateur = await prisma.utilisateur.findUnique({ where: { email } });
    if (!utilisateur) return res.status(400).json({ error: "Identifiants incorrects." });

    const mdpValide = await bcrypt.compare(motDePasse, utilisateur.motDePasse);
    if (!mdpValide) return res.status(400).json({ error: "Identifiants incorrects." });

    const token = jwt.sign(
      { id: utilisateur.id, role: utilisateur.role, clientId: utilisateur.clientId },
      process.env.JWT_SECRET as string,
      { expiresIn: '8h' }
    );

    return res.json({ token, role: utilisateur.role });
  } catch (error) {
    return res.status(500).json({ error: "Erreur serveur lors de la connexion." });
  }
});

// Route d'inscription d'un nouvel agent (Admin uniquement)
app.post('/api/utilisateurs', verifierToken, autoriserRoles(['ADMINISTRATEUR']), async (req: UserRequest, res) => {
  try {
    const { email, motDePasse, role, nom, prenom, telephone, adresse } = req.body;

    if (!email || !motDePasse || !role || !nom || !prenom || !telephone) {
      return res.status(400).json({ error: "Tous les champs obligatoires doivent être renseignés." });
    }

    const utilisateurExistant = await prisma.utilisateur.findUnique({ where: { email } });
    if (utilisateurExistant) return res.status(400).json({ error: "Cet email est déjà utilisé." });

    const sel = await bcrypt.genSalt(10);
    const motDePasseHache = await bcrypt.hash(motDePasse, sel);

    const nouvelUtilisateur = await prisma.utilisateur.create({
      data: {
        email,
        motDePasse: motDePasseHache,
        role,
        nom,
        prenom,
        telephone,
        adresse
      }
    });

    return res.status(201).json({ message: "Collaborateur créé avec succès.", utilisateur: nouvelUtilisateur });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erreur lors de la création de l'utilisateur." });
  }
});

// Récupérer tous les utilisateurs (Admin uniquement)
app.get('/api/utilisateurs', verifierToken, autoriserRoles(['ADMINISTRATEUR']), async (req, res) => {
  try {
    const utilisateurs = await prisma.utilisateur.findMany({ orderBy: { createdAt: 'desc' } });
    return res.json(utilisateurs);
  } catch (error) {
    return res.status(500).json({ error: "Impossible de récupérer les utilisateurs." });
  }
});

// Modifier un utilisateur (Admin uniquement)
app.put('/api/utilisateurs/:id', verifierToken, autoriserRoles(['ADMINISTRATEUR']), async (req, res) => {
  try {
    const id = req.params.id as string; // Sécurisation du type pour exactOptionalPropertyTypes
    const { email, role, nom, prenom, telephone, adresse, motDePasse } = req.body;

    const data: any = { email, role, nom, prenom, telephone, adresse };

    if (motDePasse && motDePasse.trim() !== '') {
      const sel = await bcrypt.genSalt(10);
      data.motDePasse = await bcrypt.hash(motDePasse, sel);
    }

    const modifie = await prisma.utilisateur.update({ where: { id }, data });
    return res.json({ message: "Compte utilisateur mis à jour.", utilisateur: modifie });
  } catch (error) {
    return res.status(500).json({ error: "Erreur lors de la modification de l'utilisateur." });
  }
});

// Supprimer un utilisateur (Admin uniquement)
app.delete('/api/utilisateurs/:id', verifierToken, autoriserRoles(['ADMINISTRATEUR']), async (req, res) => {
  try {
    const id = req.params.id as string;
    await prisma.utilisateur.delete({ where: { id } });
    return res.json({ message: "Compte supprimé définitivement." });
  } catch (error) {
    return res.status(500).json({ error: "Erreur lors de la suppression." });
  }
});

// =========================================================================
// 👤 SECTION GESTION DES CLIENTS
// =========================================================================

// Inscrire un client avec sa date de naissance requise
app.post('/api/clients', verifierToken, autoriserRoles(['ADMINISTRATEUR', 'GESTIONNAIRE']), async (req, res) => {
  try {
    const { nom, prenom, email, telephone, adresse, dateNaissance } = req.body;

    if (!nom || !prenom || !email || !telephone || !dateNaissance) {
      return res.status(400).json({ error: "Tous les champs requis doivent être renseignés." });
    }

    const numeroClient = `CLI-${Date.now()}`;
    const nouveauClient = await prisma.client.create({
      data: { 
        numeroClient,
        nom, 
        prenom,
        email, 
        telephone, 
        adresse,
        dateNaissance: new Date(dateNaissance)
      }
    });
    
    return res.status(201).json(nouveauClient);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erreur lors de la création du client." });
  }
});

// Récupérer la liste des clients
app.get('/api/clients', verifierToken, autoriserRoles(['ADMINISTRATEUR', 'GESTIONNAIRE']), async (req, res) => {
  try {
    const clients = await prisma.client.findMany({
      include: { colis: true },
      orderBy: { createdAt: 'desc' }
    });
    return res.json(clients);
  } catch (error) {
    return res.status(500).json({ error: "Erreur de chargement des fiches clients." });
  }
});

// Modifier un client
app.put('/api/clients/:id', verifierToken, autoriserRoles(['ADMINISTRATEUR', 'GESTIONNAIRE']), async (req, res) => {
  try {
    const id = req.params.id as string;
    const { nom, prenom, email, telephone, adresse } = req.body;

    const misAJour = await prisma.client.update({
      where: { id },
      data: { nom, prenom, email, telephone, adresse }
    });
    return res.json({ message: "Fiche client actualisée.", client: misAJour });
  } catch (error) {
    return res.status(500).json({ error: "Erreur lors de la mise à jour." });
  }
});

// Supprimer un client
app.delete('/api/clients/:id', verifierToken, autoriserRoles(['ADMINISTRATEUR', 'GESTIONNAIRE']), async (req, res) => {
  try {
    const id = req.params.id as string;
    await prisma.client.delete({ where: { id } });
    return res.json({ message: "Fiche client retirée du système." });
  } catch (error) {
    return res.status(500).json({ error: "Erreur lors de la suppression." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur backend lancé sur http://localhost:${PORT}`);
});
