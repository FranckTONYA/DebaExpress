import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent {
  // Injections des services Angular v19
  public authService = inject(AuthService);
  private http = inject(HttpClient);
  private router = inject(Router);

  // Signaux réactifs pour le formulaire d'enregistrement de client
  nom = signal<string>('');
  prenom = signal<string>('');
  email = signal<string>('');
  telephone = signal<string>('');
  adresse = signal<string>('');

  // Signaux d'état de l'interface graphique
  erreurMessage = signal<string | null>(null);
  succesMessage = signal<string | null>(null);
  isLoading = signal<boolean>(false);

  // 🚪 Fonction de déconnexion sécurisée
  deconnecter() {
    this.authService.deconnexion();
    this.router.navigate(['/connexion']);
  }

  // 🔗 Navigation vers la page d'administration des utilisateurs
  allerAGestionUtilisateurs() {
    this.router.navigate(['/admin/utilisateurs']);
  }

  // 👤 Fonction d'enregistrement d'un nouveau client dans PostgreSQL Alwaysdata
  enregistrerClient() {
    if (!this.nom() || !this.prenom() || !this.email() || !this.telephone()) {
      this.erreurMessage.set('Veuillez remplir tous les champs obligatoires (Nom, Prénom, Email, Téléphone).');
      return;
    }

    this.isLoading.set(true);
    this.erreurMessage.set(null);
    this.succesMessage.set(null);

    const clientData = {
      nom: this.nom(),
      prenom: this.prenom(),
      email: this.email(),
      telephone: this.telephone(),
      adresse: this.adresse()
    };

    // L'intercepteur HTTP injecte automatiquement le token JWT requis par le serveur Express
    this.http.post<any>('http://localhost:3000/api/clients', clientData)
      .subscribe({
        next: (reponse) => {
          this.isLoading.set(false);
          this.succesMessage.set(`Le client ${reponse.prenom} ${reponse.nom} a été créé avec le numéro : ${reponse.numeroClient}`);
          
          // Réinitialisation des champs du formulaire après succès
          this.nom.set('');
          this.prenom.set('');
          this.email.set('');
          this.telephone.set('');
          this.adresse.set('');
        },
        error: (err) => {
          this.isLoading.set(false);
          this.erreurMessage.set(err.error?.error || 'Une erreur est survenue lors de l’enregistrement du client.');
        }
      });
  }
}
