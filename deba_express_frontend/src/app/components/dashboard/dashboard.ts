import { Component, inject, signal, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule], // 💡 Remplacement de FormsModule par ReactiveFormsModule
  templateUrl: './dashboard.html'
})
export class DashboardComponent implements OnInit {
  public authService = inject(AuthService);
  private http = inject(HttpClient);
  private fb = inject(FormBuilder);

  clientForm!: FormGroup;
  erreurMessage = signal<string | null>(null);
  succesMessage = signal<string | null>(null);
  isLoading = signal<boolean>(false);

  ngOnInit() {
    // Déclaration des règles strictes de contrôle
    this.clientForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, Validators.pattern('^[+]?[0-9]{8,15}$')]], // Format international
      adresse: [''], // Non obligatoire
      dateNaissance: ['', Validators.required] 
    });
  }

  enregistrerClient() {
    if (this.clientForm.invalid) {
      this.erreurMessage.set('Veuillez corriger les erreurs du formulaire avant validation.');
      return;
    }

    this.isLoading.set(true);
    this.erreurMessage.set(null);
    this.succesMessage.set(null);

    this.http.post<any>('http://localhost:3000/api/clients', this.clientForm.value)
      .subscribe({
        next: (reponse) => {
          this.isLoading.set(false);
          this.succesMessage.set(`Le client ${reponse.prenom} ${reponse.nom} a été créé.`);
          this.clientForm.reset();
        },
        error: (err) => {
          this.isLoading.set(false);
          this.erreurMessage.set(err.error?.error || 'Erreur d’enregistrement.');
        }
      });
  }
}
