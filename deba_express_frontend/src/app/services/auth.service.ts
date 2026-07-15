import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Récupération de l'identifiant de la plateforme d'exécution (Serveur ou Navigateur)
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  // Initialisation sécurisée du signal réactif
  currentRole = signal<string | null>(
    this.isBrowser ? localStorage.getItem('user_role') : null
  );

  enregistrerSession(token: string, role: string) {
    if (this.isBrowser) {
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user_role', role);
      this.currentRole.set(role);
    }
  }

  getToken(): string | null {
    return this.isBrowser ? localStorage.getItem('auth_token') : null;
  }

  estConnecte(): boolean {
    return !!this.getToken();
  }

  verifierRole(rolesAutorises: string[]): boolean {
    const roleActuel = this.currentRole();
    return roleActuel ? rolesAutorises.includes(roleActuel) : false;
  }

  deconnexion() {
    if (this.isBrowser) {
      localStorage.clear();
      this.currentRole.set(null);
    }
  }
}
