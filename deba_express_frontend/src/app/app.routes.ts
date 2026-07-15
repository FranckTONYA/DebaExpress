import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard.js'; // Extension obligatoire selon configuration
import { DashboardComponent } from './components/dashboard/dashboard';
// import { TrackingComponent } from './components/tracking/tracking';
import { ConnexionComponent } from './components/connexion/connexion';
import { AdminUsersComponent } from './components/admin-users/admin-users';

export const routes: Routes = [
  { path: 'connexion', component: ConnexionComponent },
  
  // Espace Logistique : Uniquement accessible aux Admins et Gestionnaires
  { 
    path: 'dashboard', 
    component: DashboardComponent, 
    canActivate: [authGuard(['ADMINISTRATEUR', 'GESTIONNAIRE'])] 
  },
  { 
    path: 'admin/utilisateurs', 
    component: AdminUsersComponent, 
    canActivate: [authGuard(['ADMINISTRATEUR'])] // Protégé par votre Guard !
  },
  
  // Espace Suivi Client : Accessible par tout le monde connecté
  // { 
  //   path: 'suivi-colis', 
  //   component: TrackingComponent, 
  //   canActivate: [authGuard(['ADMINISTRATEUR', 'GESTIONNAIRE', 'CLIENT'])] 
  // },

  { path: '', redirectTo: 'connexion', pathMatch: 'full' }
];
