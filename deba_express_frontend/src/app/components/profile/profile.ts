import { Component, inject, signal, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile.html'
})
export class ProfileComponent implements OnInit {
  private http = inject(HttpClient);
  private fb = inject(FormBuilder);

  profileForm!: FormGroup;
  erreurMessage = signal<string | null>(null);
  succesMessage = signal<string | null>(null);
  isLoading = signal<boolean>(false);
  
  // Signaux visuels pour l'œil du mot de passe
  masquerMdp = signal<boolean>(true);
  masquerConfMdp = signal<boolean>(true);

  ngOnInit() {
    this.initForm();
    this.chargerMonProfil();
  }

  initForm() {
    this.profileForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, Validators.pattern('^[+]?[0-9]{8,15}$')]],
      adresse: [''],
      motDePasse: ['', [Validators.minLength(6)]],
      confirmerMotDePasse: ['']
    }, { validators: this.verifierMotsDePasseIdentiques }); // 💡 Ajout du validateur personnalisé de correspondance
  }

  // 🔍 Validateur de correspondance des mots de passe
  verifierMotsDePasseIdentiques(control: AbstractControl): ValidationErrors | null {
    const mdp = control.get('motDePasse')?.value;
    const confMdp = control.get('confirmerMotDePasse')?.value;
    
    if (mdp && mdp !== confMdp) {
      control.get('confirmerMotDePasse')?.setErrors({ mdpNonIdentique: true });
      return { mdpNonIdentique: true };
    }
    return null;
  }

  chargerMonProfil() {
    this.http.get<any>('http://localhost:3000/api/profil/moi').subscribe({
      next: (user) => {
        this.profileForm.patchValue({
          nom: user.nom,
          prenom: user.prenom,
          email: user.email,
          telephone: user.telephone,
          adresse: user.adresse
        });
      },
      error: () => this.erreurMessage.set('Impossible de charger vos données personnelles.')
    });
  }

  sauvegarderProfil() {
    if (this.profileForm.invalid) {
      this.erreurMessage.set('Veuillez corriger les erreurs avant d’enregistrer.');
      return;
    }

    this.isLoading.set(true);
    this.erreurMessage.set(null);
    this.succesMessage.set(null);

    this.http.put<any>('http://localhost:3000/api/profil/moi', this.profileForm.value)
      .subscribe({
        next: (res) => {
          this.isLoading.set(false);
          this.succesMessage.set(res.message);
          this.profileForm.patchValue({ motDePasse: '', confirmerMotDePasse: '' });
        },
        error: (err) => {
          this.isLoading.set(false);
          this.erreurMessage.set(err.error?.error || 'Une erreur est survenue.');
        }
      });
  }
}
