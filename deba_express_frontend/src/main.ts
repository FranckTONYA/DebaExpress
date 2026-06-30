import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config.js'; // Conservez l'import de config d'origine
import { Component } from '@angular/core';
import { DashboardComponent } from './app/components/dashboard/dashboard';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DashboardComponent], // Angular peut maintenant analyser statiquement ce composant
  template: `<app-dashboard></app-dashboard>`
})
export class AppRootComponent {} // CORRECTION 2 : Changement de nom pour éviter le conflit avec l'import 'App'

// Lancement de l'application avec le nouveau composant racine nettoyé
bootstrapApplication(AppRootComponent, appConfig)
  .catch((err) => console.error(err));
