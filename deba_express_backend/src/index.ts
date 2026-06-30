import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pg from 'pg'; // Pilote natif PostgreSQL
import { PrismaPg } from '@prisma/adapter-pg'; // Adaptateur Prisma 7
import { PrismaClient } from './generated/client/index.js';

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error("🚨 Erreur critique : DATABASE_URL n'est pas définie dans le fichier .env");
}

const app = express();

// 1. Initialiser la connexion brute PostgreSQL via le pilote de Node.js
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

// 2. Créer l'adaptateur requis par Prisma 7
const adapter = new PrismaPg(pool);

// 3. Instancier le client Prisma avec l'adaptateur
const prisma = new PrismaClient({ adapter });

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Route test
app.get('/api/status', (req, res) => {
  res.json({ message: "Le serveur Deba Express fonctionne parfaitement sous Prisma 7 !" });
});

// Exemple de route : Créer un client
app.post('/api/clients', async (req, res) => {
  try {
    const { nom, email, telephone, adresse } = req.body;
    const nouveauClient = await prisma.client.create({
      data: { nom, email, telephone, adresse }
    });
    res.status(201).json(nouveauClient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la création du client." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur backend lancé sur http://localhost:${PORT}`);
});
