import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard = (rolesAutorises: string[]): CanActivateFn => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (!authService.estConnecte()) {
      router.navigate(['/connexion']);
      return false;
    }

    if (!authService.verifierRole(rolesAutorises)) {
      router.navigate(['/acces-interdit']); // Page d'erreur si un Client tente d'aller sur l'admin
      return false;
    }

    return true;
  };
};
