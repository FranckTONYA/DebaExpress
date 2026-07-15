import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config.js'; 
import { Component } from '@angular/core';
// 1. IMPORTATION CRITIQUE : Importer le module du Routeur
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  // 2. IMPORTS : Remplacer DashboardComponent par RouterOutlet
  imports: [RouterOutlet], 
  // 3. TEMPLATE : Remplacer l'affichage fixe par la balise dynamique du routeur
  template: `<router-outlet></router-outlet>`,
  styleUrl: './styles.css'
})
export class AppRootComponent {} 

bootstrapApplication(AppRootComponent, appConfig)
  .catch((err) => console.error(err));
