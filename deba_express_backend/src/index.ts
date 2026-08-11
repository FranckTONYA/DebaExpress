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

// =========================================================================
// 👤 SECTION PROFILE PERSONNEL (POUR L'UTILISATEUR CONNECTÉ)
// =========================================================================

// 1. Récupérer les informations de l'utilisateur actuellement connecté
app.get('/api/profil/moi', verifierToken, async (req: UserRequest, res) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Non authentifié." });

    const utilisateur = await prisma.utilisateur.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        role: true,
        nom: true,
        prenom: true,
        telephone: true,
        adresse: true,
        createdAt: true
      }
    });

    if (!utilisateur) return res.status(404).json({ error: "Utilisateur introuvable." });
    return res.json(utilisateur);
  } catch (error) {
    return res.status(500).json({ error: "Erreur lors de la récupération du profil." });
  }
});

// 2. Mettre à jour ses propres informations et/ou son mot de passe
app.put('/api/profil/moi', verifierToken, async (req: UserRequest, res) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Non authentifié." });

    const { nom, prenom, telephone, adresse, email, motDePasse } = req.body;

    // Validation des champs obligatoires de base
    if (!nom || !prenom || !email || !telephone) {
      return res.status(400).json({ error: "Le nom, prénom, email et téléphone sont obligatoires." });
    }

    // Vérifier si le nouvel email n'est pas déjà pris par quelqu'un d'autre
    const emailExistant = await prisma.utilisateur.findFirst({
      where: {
        email,
        NOT: { id: req.user.id }
      }
    });
    if (emailExistant) return res.status(400).json({ error: "Cette adresse email est déjà utilisée." });

    const data: any = { nom, prenom, telephone, adresse, email };

    // Si l'utilisateur demande à changer son mot de passe
    if (motDePasse && motDePasse.trim() !== '') {
      if (motDePasse.length < 6) {
        return res.status(400).json({ error: "Le mot de passe doit contenir au moins 6 caractères." });
      }
      const sel = await bcrypt.genSalt(10);
      data.motDePasse = await bcrypt.hash(motDePasse, sel);
    }

    const profilMisAJour = await prisma.utilisateur.update({
      where: { id: req.user.id },
      data,
      select: { id: true, email: true, role: true, nom: true, prenom: true, telephone: true, adresse: true }
    });

    return res.json({ message: "Votre profil a été mis à jour avec succès !", utilisateur: profilMisAJour });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erreur lors de la mise à jour du profil." });
  }
});

// =========================================================================
// 🗂️ SECTION TARIFICATION : CATÉGORIES & SOUS-CATÉGORIES
// =========================================================================

// 1. Lire toute la nomenclature tarifaire (Catégories + Sous-catégories)
app.get('/api/categories', verifierToken, autoriserRoles(['ADMINISTRATEUR', 'GESTIONNAIRE']), async (req, res) => {
  try {
    const nomenclature = await prisma.categorieColis.findMany({
      include: { sousCategories: true },
      orderBy: { nom: 'asc' }
    });
    return res.json(nomenclature);
  } catch (error) {
    return res.status(500).json({ error: "Impossible de charger les catégories tarifaires." });
  }
});

// 2. Créer une Catégorie Colis (Champs requis obligatoires)
app.post('/api/categories', verifierToken, autoriserRoles(['ADMINISTRATEUR']), async (req, res) => {
  try {
    const { nom, description, prixUnitaire, mesure } = req.body;
    if (!nom || prixUnitaire === undefined || !mesure) {
      return res.status(400).json({ error: "Le nom, le prix unitaire de base et la mesure sont obligatoires." });
    }

    const categorie = await prisma.categorieColis.create({
      data: {
        nom,
        description,
        prixUnitaire: parseFloat(prixUnitaire),
        mesure // 'POIDS' ou 'PIECE'
      }
    });
    return res.status(201).json(categorie);
  } catch (error) {
    return res.status(400).json({ error: "Une catégorie portant ce nom existe déjà." });
  }
});

// 3. Créer une Sous-Catégorie Colis (Valeurs prix/mesures optionnelles pour héritage)
app.post('/api/sous-categories', verifierToken, autoriserRoles(['ADMINISTRATEUR']), async (req, res) => {
  try {
    const { nom, prixUnitaire, mesure, categorieId } = req.body;
    if (!nom || !categorieId) {
      return res.status(400).json({ error: "Le nom de la sous-catégorie et la catégorie parente sont obligatoires." });
    }

    const sousCategorie = await prisma.sousCategorieColis.create({
      data: {
        nom,
        categorieId,
        prixUnitaire: prixUnitaire ? parseFloat(prixUnitaire) : null,
        mesure: mesure || null
      }
    });
    return res.status(201).json(sousCategorie);
  } catch (error) {
    return res.status(400).json({ error: "Erreur : cette sous-catégorie existe déjà dans cette catégorie." });
  }
});

// 4. Modifier une Catégorie Colis
app.put('/api/categories/:id', verifierToken, autoriserRoles(['ADMINISTRATEUR']), async (req, res) => {
  try {
    const id = req.params.id as string;
    const { nom, description, prixUnitaire, mesure } = req.body;

    const categorieModifiee = await prisma.categorieColis.update({
      where: { id },
      data: {
        nom,
        description,
        prixUnitaire: parseFloat(prixUnitaire),
        mesure
      }
    });
    return res.json(categorieModifiee);
  } catch (error) {
    return res.status(500).json({ error: "Erreur lors de la modification de la catégorie." });
  }
});

// 5. Modifier une Sous-Catégorie Colis (Permet de surcharger ou de repasser à null pour réhériter)
app.put('/api/sous-categories/:id', verifierToken, autoriserRoles(['ADMINISTRATEUR']), async (req, res) => {
  try {
    const id = req.params.id as string;
    const { nom, prixUnitaire, mesure } = req.body;

    const sousCategorieModifiee = await prisma.sousCategorieColis.update({
      where: { id },
      data: {
        nom,
        prixUnitaire: prixUnitaire === '' || prixUnitaire === null ? null : parseFloat(prixUnitaire),
        mesure: mesure === '' ? null : mesure
      }
    });
    return res.json(sousCategorieModifiee);
  } catch (error) {
    return res.status(500).json({ error: "Erreur lors de la modification de la sous-catégorie." });
  }
});

// 6. Supprimer une Catégorie Colis (Cascade automatique vers les sous-catégories via Prisma)
app.delete('/api/categories/:id', verifierToken, autoriserRoles(['ADMINISTRATEUR']), async (req, res) => {
  try {
    const id = req.params.id as string;
    await prisma.categorieColis.delete({ where: { id } });
    return res.json({ message: "Catégorie et toutes ses sous-catégories supprimées avec succès." });
  } catch (error) {
    return res.status(500).json({ error: "Erreur lors de la suppression." });
  }
});

// 7. Supprimer uniquement une Sous-Catégorie Colis
app.delete('/api/sous-categories/:id', verifierToken, autoriserRoles(['ADMINISTRATEUR']), async (req, res) => {
  try {
    const id = req.params.id as string;
    await prisma.sousCategorieColis.delete({ where: { id } });
    return res.json({ message: "Sous-catégorie supprimée avec succès." });
  } catch (error) {
    return res.status(500).json({ error: "Erreur lors de la suppression." });
  }
});



app.listen(PORT, () => {
  console.log(`🚀 Serveur backend lancé sur http://localhost:${PORT}`);
});
