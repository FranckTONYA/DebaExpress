import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard.js';
import { ConnexionComponent } from './components/connexion/connexion';
import { LayoutComponent } from './components/layout/layout';
import { DashboardComponent } from './components/dashboard/dashboard';
import { AdminUsersComponent } from './components/admin-users/admin-users';
import { ManageClientsComponent } from './components/manage-clients/manage-clients';
import { ManageUsersComponent } from './components/manage-users/manage-users';
// import { TrackingComponent } from './components/tracking/tracking';

export const routes: Routes = [
  // Page accessible sans connexion
  { path: 'connexion', component: ConnexionComponent },
  
  // Structure globale avec menu centralisé
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard(['ADMINISTRATEUR', 'GESTIONNAIRE', 'CLIENT'])], // Vérification globale de connexion
    children: [
      // 📊 Dashboard : Réservé aux équipes logistiques
      { 
        path: 'dashboard', 
        component: DashboardComponent,
        canActivate: [authGuard(['ADMINISTRATEUR', 'GESTIONNAIRE'])] 
      },
      
      // ➕ Ajout Utilisateurs : Strictement réservé aux Administrateurs
      { 
        path: 'admin/utilisateurs', 
        component: AdminUsersComponent,
        canActivate: [authGuard(['ADMINISTRATEUR'])] 
      },
      
      // 🗇 Liste / Modif Clients : Réservé aux équipes logistiques
      { 
        path: 'gestion/clients', 
        component: ManageClientsComponent,
        canActivate: [authGuard(['ADMINISTRATEUR', 'GESTIONNAIRE'])] 
      },
      
      // 👑 Gestion complète Utilisateurs : Strictement réservé aux Administrateurs
      { 
        path: 'admin/gestion-utilisateurs', 
        component: ManageUsersComponent,
        canActivate: [authGuard(['ADMINISTRATEUR'])] // 💡 Sécurisé ici !
      },
      
      // 📦 Suivi Colis : Ouvert à tout le monde (y compris les clients pour leur tracking)
      // { 
      //   path: 'suivi-colis', 
      //   component: TrackingComponent,
      //   canActivate: [authGuard(['ADMINISTRATEUR', 'GESTIONNAIRE', 'CLIENT'])] 
      // },
      
      // Redirection par défaut vers le dashboard
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  
  // Capture de toutes les fausses routes
  { path: '**', redirectTo: 'connexion' }
];
