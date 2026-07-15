import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './connexion.html',
  styleUrl: './connexion.css'
})
export class ConnexionComponent {
  private http = inject(HttpClient);
  private router = inject(Router);
  private authService = inject(AuthService);

  // Signaux réactifs v19 pour gérer les données et les états d'affichage
  email = signal<string>('');
  motDePasse = signal<string>('');
  erreurMessage = signal<string | null>(null);
  isLoading = signal<boolean>(false);

  onSubmit() {
    if (!this.email() || !this.motDePasse()) {
      this.erreurMessage.set('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    this.isLoading.set(true);
    this.erreurMessage.set(null);

    const loginData = {
      email: this.email(),
      motDePasse: this.motDePasse()
    };

    // Appel vers votre serveur Express Alwaysdata local ou en ligne
    this.http.post<{ token: string; role: string }>('http://localhost:3000/api/auth/connexion', loginData)
      .subscribe({
        next: (reponse) => {
          this.isLoading.set(false);
          // Enregistrement sécurisé du JWT et du rôle dans le LocalStorage via le service
          this.authService.enregistrerSession(reponse.token, reponse.role);
          
          // Redirection intelligente selon le profil de l'utilisateur
          if (reponse.role === 'ADMINISTRATEUR' || reponse.role === 'GESTIONNAIRE') {
            this.router.navigate(['/dashboard']);
          } else {
            this.router.navigate(['/suivi-colis']);
          }
        },
        error: (err) => {
          this.isLoading.set(false);
          if (err.status === 400) {
            this.erreurMessage.set(err.error.error || 'Identifiants ou mot de passe incorrects.');
          } else {
            this.erreurMessage.set('Une erreur serveur est survenue. Veuillez réessayer.');
          }
        }
      });
  }
}
