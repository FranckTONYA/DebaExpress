import { Component, inject, signal, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { API_URL } from '../../app.config';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [ReactiveFormsModule], // 💡 Utilisation exclusive des formulaires réactifs
  templateUrl: './admin-users.html',
  styleUrl: './admin-users.css'
})
export class AdminUsersComponent implements OnInit {
  private http = inject(HttpClient);
    private apiUrl = inject(API_URL); 
  private fb = inject(FormBuilder);

  userForm!: FormGroup;
  
  // Signaux réactifs pour gérer les états de l'interface graphique
  erreurMessage = signal<string | null>(null);
  succesMessage = signal<string | null>(null);
  isLoading = signal<boolean>(false);

  ngOnInit() {
    // Configuration des contrôles et des règles de validation strictes
    this.userForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, Validators.pattern('^[+]?[0-9]{8,15}$')]], // Format numérique international
      adresse: [''], // Champ optionnel non obligatoire
      motDePasse: ['', [Validators.required, Validators.minLength(6)]], // Sécurité minimale 6 caractères
      role: ['GESTIONNAIRE', Validators.required]
    });
  }

  creerUtilisateur() {
    // Sécurité : on bloque l'exécution si le formulaire comporte des erreurs
    if (this.userForm.invalid) {
      this.erreurMessage.set('Veuillez corriger les erreurs de saisie avant de valider.');
      return;
    }

    this.isLoading.set(true);
    this.erreurMessage.set(null);
    this.succesMessage.set(null);

    // L'intercepteur HTTP global injectera automatiquement le token JWT d'administration
    this.http.post<any>(`${this.apiUrl}/utilisateurs`, this.userForm.value)
      .subscribe({
        next: (res) => {
          this.isLoading.set(false);
          this.succesMessage.set(res.message);
          // Réinitialisation du formulaire avec le rôle par défaut
          this.userForm.reset({ role: 'GESTIONNAIRE' });
        },
        error: (err) => {
          this.isLoading.set(false);
          this.erreurMessage.set(err.error?.error || 'Une erreur est survenue lors de la création du compte.');
        }
      });
  }
}
