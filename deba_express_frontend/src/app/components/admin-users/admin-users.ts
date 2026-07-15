import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-users.html',
  styleUrl: './admin-users.css'
})
export class AdminUsersComponent {
  private http = inject(HttpClient);

  // Signaux réactifs pour les champs du formulaire
  email = signal<string>('');
  motDePasse = signal<string>('');
  roleChoisi = signal<string>('GESTIONNAIRE');

  // Signaux d'état de l'interface
  erreurMessage = signal<string | null>(null);
  succesMessage = signal<string | null>(null);
  isLoading = signal<boolean>(false);

  creerUtilisateur() {
    if (!this.email() || !this.motDePasse()) {
      this.erreurMessage.set('Veuillez remplir l’ensemble des champs.');
      return;
    }

    this.isLoading.set(true);
    this.erreurMessage.set(null);
    this.succesMessage.set(null);

    const payload = {
      email: this.email(),
      motDePasse: this.motDePasse(),
      role: this.roleChoisi()
    };

    // Le token JWT sera injecté automatiquement par votre Intercepteur HTTP global !
    this.http.post<any>('http://localhost:3000/api/utilisateurs', payload)
      .subscribe({
        next: (res) => {
          this.isLoading.set(false);
          this.succesMessage.set(res.message);
          // Réinitialisation du formulaire après succès
          this.email.set('');
          this.motDePasse.set('');
        },
        error: (err) => {
          this.isLoading.set(false);
          this.erreurMessage.set(err.error?.error || 'Une erreur est survenue lors de l’enregistrement.');
        }
      });
  }
}
