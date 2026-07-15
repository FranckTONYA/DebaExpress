// CORRECTION : Ajout du mot-clé "type" pour respecter verbatimModuleSyntax
import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extension de l'interface Request d'Express
export interface UserRequest extends Request {
  user?: { id: string; role: string; clientId?: string };
}

// Étape A : Vérifier si l'utilisateur est connecté
export const verifierToken = (req: UserRequest, res: Response, next: NextFunction) => {
  // Correction de la récupération du token (prise en compte de l'index [1] après le split)
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: "Accès refusé. Aucun jeton fourni." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: "Jeton invalide ou expiré." });
  }
};

// Étape B : Filtrer l'accès selon les rôles autorisés
export const autoriserRoles = (rolesAutorises: string[]) => {
  return (req: UserRequest, res: Response, next: NextFunction) => {
    if (!req.user || !rolesAutorises.includes(req.user.role)) {
      return res.status(403).json({ error: "Accès interdit. Privilèges insuffisants." });
    }
    next();
  };
};
