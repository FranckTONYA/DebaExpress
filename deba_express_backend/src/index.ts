import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pg from 'pg'; 
import { PrismaPg } from '@prisma/adapter-pg'; 
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Importation Prisma v7 + NodeNext stabilisée
import { PrismaClient } from './generated/client/client.js';
import { verifierToken, autoriserRoles } from './middlewares/auth.js';
import type { UserRequest } from './middlewares/auth.js';

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error("🚨 Erreur critique : DATABASE_URL n'est pas définie dans le fichier .env");
}

const app = express();

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Route test
app.get('/api/status', (req, res) => {
  res.json({ message: "Le serveur Deba Express fonctionne parfaitement sous Prisma 7 !" });
});

// 👤 ROUTE CORRIGÉE : Créer un client avec tous les champs requis par le schéma
app.post('/api/clients', async (req, res) => {
  try {
    const { nom, prenom, email, telephone, adresse } = req.body;

    // Validation manuelle de sécurité
    if (!nom || !prenom || !email || !telephone) {
      return res.status(400).json({ error: "Les champs nom, prenom, email et telephone sont obligatoires." });
    }

    // Génération automatique d'un numéro de client unique Deba Express (Ex: CLI-171829381)
    const numeroClient = `CLI-${Date.now()}`;

    const nouveauClient = await prisma.client.create({
      data: { 
        numeroClient,
        nom, 
        prenom,
        email, 
        telephone, 
        adresse 
      }
    });
    
    return res.status(201).json(nouveauClient);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erreur lors de la création du client." });
  }
});

// 🚪 ROUTE DE CONNEXION (Génère le Token JWT)
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

// 👥 ROUTE ADMIN : Créer un nouvel utilisateur avec un rôle spécifique
app.post(
  '/api/utilisateurs', 
  verifierToken, 
  autoriserRoles(['ADMINISTRATEUR']), // Verrouillage strict : Administrateur uniquement
  async (req: UserRequest, res) => {
    try {
      const { email, motDePasse, role } = req.body;

      // 1. Validation des champs
      if (!email || !motDePasse || !role) {
        return res.status(400).json({ error: "Tous les champs (email, motDePasse, role) sont obligatoires." });
      }

      // 2. Vérification de la validité du rôle envoyé
      if (!['ADMINISTRATEUR', 'GESTIONNAIRE', 'CLIENT'].includes(role)) {
        return res.status(400).json({ error: "Le rôle spécifié est invalide." });
      }

      // 3. Vérification si l'email existe déjà en base
      const utilisateurExistant = await prisma.utilisateur.findUnique({ where: { email } });
      if (utilisateurExistant) {
        return res.status(400).json({ error: "Un utilisateur avec cet email existe déjà." });
      }

      // 4. Hachage du mot de passe pour la sécurité
      const sel = await bcrypt.genSalt(10);
      const motDePasseHache = await bcrypt.hash(motDePasse, sel);

      // 5. Création de l'utilisateur dans PostgreSQL sur Alwaysdata
      const nouvelUtilisateur = await prisma.utilisateur.create({
        data: {
          email,
          motDePasse: motDePasseHache,
          role: role // 'ADMINISTRATEUR' ou 'GESTIONNAIRE'
        },
        select: {
          id: true,
          email: true,
          role: true,
          createdAt: true
        }
      });

      return res.status(201).json({
        message: `L'utilisateur ${email} avec le rôle ${role} a été créé avec succès.`,
        utilisateur: nouvelUtilisateur
      });

    } catch (error) {
      console.error("Erreur création utilisateur:", error);
      return res.status(500).json({ error: "Erreur serveur lors de la création de l'utilisateur." });
    }
  }
);


// 🔒 EXEMPLE DE ROUTE SÉCURISÉE (Seuls l'Admin et le Gestionnaire peuvent créer un colis)
app.post('/api/colis', verifierToken, autoriserRoles(['ADMINISTRATEUR', 'GESTIONNAIRE']), async (req: UserRequest, res) => {
  res.json({ message: "Colis créé avec succès par un utilisateur autorisé !" });
});

// 🛠️ ROUTE DE SECOURS : Créer un Administrateur propre directement depuis le code
app.get('/api/auth/initialiser-admin', async (req, res) => {
  try {
    const emailAdmin = 'admin@debaexpress.com';
    
    // 1. Supprimer l'ancien compte s'il existe pour éviter les conflits de doublons
    await prisma.utilisateur.deleteMany({
      where: { email: emailAdmin }
    });

    // 2. Générer un hachage Bcrypt natif et certifié par votre propre serveur
    const sel = await bcrypt.genSalt(10);
    const motDePasseHache = await bcrypt.hash('admin', sel);

    // 3. Insérer le compte propre dans Alwaysdata
    const nouvelAdmin = await prisma.utilisateur.create({
      data: {
        email: emailAdmin,
        motDePasse: motDePasseHache,
        role: 'ADMINISTRATEUR',
        clientId: null // Aucun lien client requis
      }
    });

    return res.json({ 
      success: true, 
      message: "Le compte Administrateur a été réinitialisé et synchronisé avec succès sur Alwaysdata !" 
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erreur lors de la réinitialisation de l'administrateur." });
  }
});


app.listen(PORT, () => {
  console.log(`🚀 Serveur backend lancé sur http://localhost:${PORT}`);
});
