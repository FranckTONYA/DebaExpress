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
// 👤 SECTION CLIENTS : ENREGISTREMENT & VÉRIFICATIONS D'EXISTENCE
// =========================================================================

// 1. Rechercher un client par son numéro unique (pour l'option "Existe déjà")
app.get('/api/clients/recherche/:numero', verifierToken, autoriserRoles(['ADMINISTRATEUR', 'GESTIONNAIRE']), async (req, res) => {
  try {
    const numero = req.params.numero as string;
    const client = await prisma.client.findUnique({ where: { numeroClient: numero } });
    if (!client) return res.status(404).json({ error: "Aucun expéditeur trouvé avec ce numéro." });
    return res.json(client);
  } catch (error) {
    return res.status(500).json({ error: "Erreur lors de la recherche du client." });
  }
});

// 2. Vérifier si un client existe avant de le créer (par email ou combinaison Nom/Prénom/Téléphone)
app.post('/api/clients/verifier-doublon', verifierToken, autoriserRoles(['ADMINISTRATEUR', 'GESTIONNAIRE']), async (req, res) => {
  try {
    const { nom, prenom, email, telephone } = req.body;

    const doublon = await prisma.client.findFirst({
      where: {
        OR: [
          { email: email },
          { AND: [ { nom: nom }, { prenom: prenom }, { telephone: telephone } ] }
        ]
      }
    });

    if (doublon) {
      return res.json({ existe: true, client: doublon });
    }
    return res.json({ existe: false });
  } catch (error) {
    return res.status(500).json({ error: "Erreur lors de la vérification de l'expéditeur." });
  }
});

// 3. Créer un client directement
app.post('/api/clients', verifierToken, autoriserRoles(['ADMINISTRATEUR', 'GESTIONNAIRE']), async (req, res) => {
  try {
    const { nom, prenom, email, telephone, adresse, dateNaissance } = req.body;
    
    if (!nom || !prenom || !email || !telephone) {
      return res.status(400).json({ error: "Les champs obligatoires (Nom, Prénom, Email, Téléphone) doivent être renseignés." });
    }

    const numeroClient = `CLI-${Date.now()}`;
    
    // Construction dynamique pour s'adapter aux chaînes vides envoyées par Angular
    const clientData: any = {
      numeroClient,
      nom,
      prenom,
      email,
      telephone,
      adresse: adresse && adresse.trim() !== '' ? adresse : null
    };

    if (dateNaissance && dateNaissance.trim() !== '') {
      clientData.dateNaissance = new Date(dateNaissance);
    }

    const client = await prisma.client.create({ data: clientData });
    return res.status(201).json(client);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Échec de l'enregistrement du client." });
  }
});


// 4. Récupérer la liste des clients
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

// 5. Modifier un client
app.put('/api/clients/:id', verifierToken, autoriserRoles(['ADMINISTRATEUR', 'GESTIONNAIRE']), async (req, res) => {
  try {
    const id = req.params.id as string;
    const { nom, prenom, email, telephone, adresse, dateNaissance } = req.body;
    
    const updateData: any = { 
      nom, 
      prenom, 
      email, 
      telephone, 
      adresse: adresse && adresse.trim() !== '' ? adresse : null 
    };
    
    if (dateNaissance && dateNaissance.trim() !== '') {
      updateData.dateNaissance = new Date(dateNaissance);
    } else {
      updateData.dateNaissance = null;
    }

    const clientMisAJour = await prisma.client.update({
      where: { id },
      data: updateData
    });
    return res.json({ message: "Client mis à jour avec succès.", client: clientMisAJour });
  } catch (error) {
    return res.status(500).json({ error: "Erreur lors de la modification du client." });
  }
});


// 6. Supprimer un client
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
// 📦 SECTION LOGISTIQUE : MULTI-ENREGISTREMENT ET CALCULS EN RAFALE
// =========================================================================

// 1. Enregistrer un groupe de colis pour un client (avec transaction atomique)
app.post('/api/colis/groupe', verifierToken, autoriserRoles(['ADMINISTRATEUR', 'GESTIONNAIRE']), async (req, res) => {
  try {
    const { expediteurId, colisList } = req.body; // colisList est un tableau d'objets colis

    if (!expediteurId || !colisList || !Array.isArray(colisList) || colisList.length === 0) {
      return res.status(400).json({ error: "Données logistiques incomplètes." });
    }

    const resultats = await prisma.$transaction(async (tx) => {
      const colisEnregistres = [];

      for (const item of colisList) {
        const sousCategorie = await tx.sousCategorieColis.findUnique({
          where: { id: item.sousCategorieId },
          include: { categorie: true }
        });

        if (!sousCategorie) throw new Error(`Sous-catégorie introuvable pour l'un des colis.`);

        const prixUnitaireApp = sousCategorie.prixUnitaire !== null ? sousCategorie.prixUnitaire : sousCategorie.categorie.prixUnitaire;
        const mesureApp = sousCategorie.mesure !== null ? sousCategorie.mesure : sousCategorie.categorie.mesure;
        const prixTotal = parseFloat(item.quantite) * prixUnitaireApp;

        const codeSuivi = `DEBA-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
        const numeroFact = `FAC-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 100)}`;

        const colis = await tx.colis.create({
          data: {
            codeSuivi,
            description: item.description || null,
            prixUnitaireApp,
            mesureApp,
            quantite: parseFloat(item.quantite),
            prixTotal,
            destination: item.destination,
            sousCategorieId: item.sousCategorieId,
            expediteurId,
            dateDepot: new Date(),
            dateEnvoi: new Date(),
            dateReception: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
          }
        });

        await tx.facture.create({
          data: {
            numeroFact,
            montant: prixTotal,
            avance: item.avance ? parseFloat(item.avance) : 0,
            estPaye: (item.avance ? parseFloat(item.avance) : 0) >= prixTotal,
            colisId: colis.id
          }
        });

        colisEnregistres.push(colis);
      }

      return colisEnregistres;
    });

    return res.status(201).json({ message: `${resultats.length} colis enregistrés avec factures.`, data: resultats });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || "Erreur lors de la transaction d'envoi." });
  }
});

// 2. Liste complète paginée, triée et filtrée des colis (Moteur de recherche multicritère)
app.get('/api/colis', verifierToken, autoriserRoles(['ADMINISTRATEUR', 'GESTIONNAIRE']), async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limite = parseInt(req.query.limite as string) || 10;
    const recherche = (req.query.recherche as string) || '';
    const tri = (req.query.tri as string) || 'createdAt'; // client, categorie, sousCategorie, createdAt
    const ordre = (req.query.ordre as string) || 'desc';

    const skip = (page - 1) * limite;

    // Définition dynamique des filtres de recherche textuelle
    const dynamicWhere: any = {};
    if (recherche) {
      dynamicWhere.OR = [
        { codeSuivi: { contains: recherche, mode: 'insensitive' } },
        { destination: { contains: recherche, mode: 'insensitive' } },
        { expediteur: { nom: { contains: recherche, mode: 'insensitive' } } },
        { expediteur: { prenom: { contains: recherche, mode: 'insensitive' } } },
        { sousCategorie: { nom: { contains: recherche, mode: 'insensitive' } } },
        { sousCategorie: { categorie: { nom: { contains: recherche, mode: 'insensitive' } } } }
      ];
    }

    // Définition dynamique du tri relationnel
    let orderByObj: any = {};
    if (tri === 'client') {
      orderByObj = { expediteur: { nom: ordre } };
    } else if (tri === 'categorie') {
      orderByObj = { sousCategorie: { categorie: { nom: ordre } } };
    } else if (tri === 'sousCategorie') {
      orderByObj = { sousCategorie: { nom: ordre } };
    } else {
      orderByObj = { [tri]: ordre };
    }

    const [colis, total] = await prisma.$transaction([
      prisma.colis.findMany({
        where: dynamicWhere,
        include: {
          expediteur: true,
          sousCategorie: { include: { categorie: true } },
          facture: true
        },
        orderBy: orderByObj,
        skip,
        take: limite
      }),
      prisma.colis.count({ where: dynamicWhere })
    ]);

    return res.json({
      total,
      page,
      pagesTotales: Math.ceil(total / limite),
      data: colis
    });
  } catch (error) {
    return res.status(500).json({ error: "Erreur de récupération de l'inventaire logistique." });
  }
});

// 3. Modifier les détails d'un colis
app.put('/api/colis/:id', verifierToken, autoriserRoles(['ADMINISTRATEUR', 'GESTIONNAIRE']), async (req, res) => {
  try {
    const id = req.params.id as string;
    const { description, quantite, destination, statut, etatSortie } = req.body;

    const colisAncien = await prisma.colis.findUnique({ where: { id }, include: { facture: true } });
    if (!colisAncien) return res.status(404).json({ error: "Colis introuvable." });

    const nouvelleQuantite = parseFloat(quantite);
    const nouveauPrixTotal = nouvelleQuantite * colisAncien.prixUnitaireApp;

    const colisMisAJour = await prisma.colis.update({
      where: { id },
      data: {
        description,
        quantite: nouvelleQuantite,
        prixTotal: nouveauPrixTotal,
        destination,
        statut,
        etatSortie
      }
    });

    // Mettre à jour automatiquement le montant lié sur la Facture
    if (colisAncien.facture) {
      await prisma.facture.update({
        where: { id: colisAncien.facture.id },
        data: {
          montant: nouveauPrixTotal,
          estPaye: colisAncien.facture.avance >= nouveauPrixTotal
        }
      });
    }

    return res.json({ message: "Colis et facture ajustés.", colis: colisMisAJour });
  } catch (error) {
    return res.status(500).json({ error: "Erreur lors de la modification du colis." });
  }
});

// 4. Supprimer un colis
app.delete('/api/colis/:id', verifierToken, autoriserRoles(['ADMINISTRATEUR', 'GESTIONNAIRE']), async (req, res) => {
  try {
    const id = req.params.id as string;
    await prisma.colis.delete({ where: { id } });
    return res.json({ message: "Colis effacé de l'inventaire logistique." });
  } catch (error) {
    return res.status(500).json({ error: "Erreur lors de la suppression du colis." });
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

// 6. Supprimer une Catégorie Colis (Console Propre)
app.delete('/api/categories/:id', verifierToken, autoriserRoles(['ADMINISTRATEUR']), async (req, res) => {
  try {
    const id = req.params.id as string;

    const colisLies = await prisma.colis.count({
      where: { sousCategorie: { categorieId: id } }
    });

    if (colisLies > 0) {
      // 💡 CORRECTION CONSOLE : On renvoie un code 200 (OK) mais avec success: false
      return res.json({ 
        success: false,
        error: `Action refusée : Cette catégorie possède des sous-catégories actuellement associées à ${colisLies} colis archivés.` 
      });
    }

    await prisma.categorieColis.delete({ where: { id } });
    return res.json({ success: true, message: "La catégorie et ses sous-catégories ont été supprimées avec succès." });

  } catch (error) {
    return res.status(500).json({ error: "Erreur serveur lors de la suppression." });
  }
});

// 7. Supprimer uniquement une Sous-Catégorie Colis (Console Propre)
app.delete('/api/sous-categories/:id', verifierToken, autoriserRoles(['ADMINISTRATEUR']), async (req, res) => {
  try {
    const id = req.params.id as string;

    const colisLies = await prisma.colis.count({
      where: { sousCategorieId: id }
    });

    if (colisLies > 0) {
      // 💡 CORRECTION CONSOLE : On renvoie un code 200 (OK) mais avec success: false
      return res.json({ 
        success: false,
        error: `Action refusée : Cette sous-catégorie tarifaire est actuellement affectée à ${colisLies} colis dans l'inventaire.` 
      });
    }

    await prisma.sousCategorieColis.delete({ where: { id } });
    return res.json({ success: true, message: "La sous-catégorie a été retirée de la nomenclature." });

  } catch (error) {
    return res.status(500).json({ error: "Erreur serveur lors de la suppression." });
  }
});


// 🌐 ROUTE PUBLIQUE : Accessible par n'importe quel internaute sans connexion
app.get('/api/public/suivi/:code', async (req, res) => {
  try {
    const code = req.params.code as string;

    const colis = await prisma.colis.findUnique({
      where: { codeSuivi: code },
      select: {
        codeSuivi: true,
        destination: true,
        quantite: true,
        mesureApp: true,
        statut: true,
        dateDepot: true,
        dateReception: true,
        etatSortie: true
        // 💡 SÉCURITÉ : On omet volontairement les liaisons privées du client (nom, factures, montants)
      }
    });

    if (!colis) {
      return res.status(404).json({ error: "Aucun colis trouvé avec ce numéro de suivi." });
    }

    return res.json(colis);
  } catch (error) {
    return res.status(500).json({ error: "Erreur lors de la récupération des données de transit." });
  }
});



app.listen(PORT, () => {
  console.log(`🚀 Serveur backend lancé sur http://localhost:${PORT}`);
});
