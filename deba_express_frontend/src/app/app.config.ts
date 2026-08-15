// CORRECTION : Utilisation de l'import stable sans le mot "Experimental"
import { ApplicationConfig, InjectionToken, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes.js'; 
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service.js';
import { environment } from '../environments/environment';

// Création d'un Token d'injection unique pour l'adresse API
export const API_URL = new InjectionToken<string>('API_URL');

export const appConfig: ApplicationConfig = {
  providers: [
    // Validation du mode Zoneless natif ultra-léger
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        (req, next) => {
          const token = inject(AuthService).getToken();
          if (token) {
            req = req.clone({
              setHeaders: { Authorization: `Bearer ${token}` }
            });
          }
          return next(req);
        }
      ])
    ),

    { provide: API_URL, useValue: environment.apiUrl } 
  ]
};
