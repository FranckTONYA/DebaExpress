import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard.js';
import { ConnexionComponent } from './components/connexion/connexion';
import { LayoutComponent } from './components/layout/layout';
import { DashboardComponent } from './components/dashboard/dashboard';
import { AdminUsersComponent } from './components/admin-users/admin-users';
import { ManageClientsComponent } from './components/manage-clients/manage-clients';
import { ManageUsersComponent } from './components/manage-users/manage-users';
import { ProfileComponent } from './components/profile/profile';
import { ManageRatesComponent } from './components/manage-rates/manage-rates.js';
import { ManageColisComponent } from './components/manage-colis/manage-colis';
import { PublicHomeComponent } from './components/public-home/public-home';
import { PublicTrackingComponent } from './components/public-tracking/public-tracking';

export const routes: Routes = [
  // Page accessible sans connexion
  { path: '', component: PublicHomeComponent },
  { path: 'suivi', component: PublicTrackingComponent },
  { path: 'connexion', component: ConnexionComponent },
  
  // Structure globale avec menu centralisé
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard(['ADMINISTRATEUR', 'GESTIONNAIRE', 'CLIENT'])],
    children: [
      
      // 📊 Dashboard / Nouvel Envoi : Réservé aux équipes logistiques
      { 
        path: 'dashboard', 
        component: DashboardComponent,
        canActivate: [authGuard(['ADMINISTRATEUR', 'GESTIONNAIRE'])] 
      },
      
      // 🗇 Liste / Modif Clients : Réservé aux équipes logistiques
      { 
        path: 'gestion/clients', 
        component: ManageClientsComponent,
        canActivate: [authGuard(['ADMINISTRATEUR', 'GESTIONNAIRE'])] 
      },

      // 📦 Inventaire Global du Fret (Colis) : Réservé aux équipes logistiques
      { 
        path: 'gestion/colis', 
        component: ManageColisComponent,
        canActivate: [authGuard(['ADMINISTRATEUR', 'GESTIONNAIRE'])] // 💡 Sécurisé ici !
      },

      // Tarification : Réservé aux équipes logistiques
      { 
        path: 'tarifs', 
        component: ManageRatesComponent,
        canActivate: [authGuard(['ADMINISTRATEUR', 'GESTIONNAIRE'])] 
      },
      
      // ➕ Ajout Utilisateurs : Strictement réservé aux Administrateurs
      { 
        path: 'admin/utilisateurs', 
        component: AdminUsersComponent,
        canActivate: [authGuard(['ADMINISTRATEUR'])] 
      },
      
      // 👑 Gestion complète Utilisateurs : Strictement réservé aux Administrateurs
      { 
        path: 'admin/gestion-utilisateurs', 
        component: ManageUsersComponent,
        canActivate: [authGuard(['ADMINISTRATEUR'])] 
      },

      // Profil : Réservé aux utilisateurs connectés
      { 
        path: 'profile', 
        component: ProfileComponent,
        canActivate: [authGuard(['ADMINISTRATEUR', 'GESTIONNAIRE', 'CLIENT'])] 
      },
      
      // Redirection par défaut vers le dashboard
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  
  // Capture de toutes les fausses routes
  { path: '**', redirectTo: 'connexion' }
];
