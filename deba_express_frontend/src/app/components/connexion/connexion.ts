import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './connexion.html'
})
export class ConnexionComponent {
  private http = inject(HttpClient);
  private router = inject(Router);
  private authService = inject(AuthService);

  email = signal<string>('');
  motDePasse = signal<string>('');
  erreurMessage = signal<string | null>(null);
  isLoading = signal<boolean>(false);
  
  // 💡 Signal pour afficher/masquer le mot de passe
  masquerMotDePasse = signal<boolean>(true);

  toggleMasquerMotDePasse() {
    this.masquerMotDePasse.set(!this.masquerMotDePasse());
  }

  onSubmit() {
    if (!this.email() || !this.motDePasse()) {
      this.erreurMessage.set('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    this.isLoading.set(true);
    this.erreurMessage.set(null);

    this.http.post<{ token: string; role: string }>('http://localhost:3000/api/auth/connexion', {
      email: this.email(),
      motDePasse: this.motDePasse()
    }).subscribe({
      next: (reponse) => {
        this.isLoading.set(false);
        this.authService.enregistrerSession(reponse.token, reponse.role);
        if (reponse.role === 'ADMINISTRATEUR' || reponse.role === 'GESTIONNAIRE') {
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/suivi-colis']);
        }
      },
      error: (err) => {
        this.isLoading.set(false);
        this.erreurMessage.set(err.error?.error || 'Identifiants incorrects.');
      }
    });
  }
}
