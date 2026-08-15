import { Component, inject, signal, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { API_URL } from '../../app.config';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './dashboard.html'
})
export class DashboardComponent implements OnInit {
  private http = inject(HttpClient);
    // RÉCUPÉRATION DYNAMIQUE : Angular injecte la bonne adresse selon le mode (dev ou prod)
  private apiUrl = inject(API_URL); 

  private fb = inject(FormBuilder);
  public authService = inject(AuthService);

  fretForm!: FormGroup;
  categories = signal<any[]>([]);
  clientDetecte = signal<any | null>(null);

  erreurMessage = signal<string | null>(null);
  succesMessage = signal<string | null>(null);
  isLoading = signal<boolean>(false);

  ngOnInit() {
    this.chargerNomenclature();
    this.initFormulaire();
  }

  initFormulaire() {
    this.fretForm = this.fb.group({
      // 💡 MODIFICATION : "NOUVEAU" est sélectionné par défaut
      modeClient: ['NOUVEAU', Validators.required], 
      numeroClientSaisi: [''],
      
      // 💡 AJOUT CONTROLES STRICTS : Structure de validation réactive pour le nouveau client
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, Validators.pattern('^[+]?[0-9]{8,15}$')]],
      adresse: [''], // Non obligatoire
      dateNaissance: [''], // Non obligatoire

      colisList: this.fb.array([this.creerBlocColis()])
    });

    // Écouter le changement de mode pour activer/désactiver dynamiquement les validations requis
    this.fretForm.get('modeClient')?.valueChanges.subscribe(mode => {
      this.clientDetecte.set(null);
      this.erreurMessage.set(null);
      this.succesMessage.set(null);
      
      const champsClient = ['nom', 'prenom', 'email', 'telephone'];
      if (mode === 'EXISTANT') {
        champsClient.forEach(c => this.fretForm.get(c)?.clearValidators());
        this.fretForm.get('numeroClientSaisi')?.setValidators([Validators.required]);
      } else {
        this.fretForm.get('nom')?.setValidators([Validators.required, Validators.minLength(2)]);
        this.fretForm.get('prenom')?.setValidators([Validators.required, Validators.minLength(2)]);
        this.fretForm.get('email')?.setValidators([Validators.required, Validators.email]);
        this.fretForm.get('telephone')?.setValidators([Validators.required, Validators.pattern('^[+]?[0-9]{8,15}$')]);
        this.fretForm.get('numeroClientSaisi')?.clearValidators();
      }
      champsClient.forEach(c => this.fretForm.get(c)?.updateValueAndValidity());
      this.fretForm.get('numeroClientSaisi')?.updateValueAndValidity();
    });
  }

  get listeDesColis(): FormArray {
    return this.fretForm.get('colisList') as FormArray;
  }

  creerBlocColis(): FormGroup {
    return this.fb.group({
      sousCategorieId: ['', Validators.required],
      quantite: ['', [Validators.required, Validators.min(0.01)]],
      destination: ['', Validators.required],
      description: [''],
      avance: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ajouterUnColis() {
    this.listeDesColis.push(this.creerBlocColis());
  }

  retirerUnColis(index: number) {
    if (this.listeDesColis.length > 1) this.listeDesColis.removeAt(index);
  }

  chargerNomenclature() {
    this.http.get<any[]>(`${this.apiUrl}/categories`).subscribe({
      next: (data) => this.categories.set(data)
    });
  }

  rechercherClientExistant() {
    const numero = this.fretForm.get('numeroClientSaisi')?.value;
    if (!numero) {
      this.erreurMessage.set('Veuillez saisir un numéro client.');
      return;
    }

    this.http.get<any>(`${this.apiUrl}/clients/recherche/${numero}`).subscribe({
      next: (client) => {
        this.clientDetecte.set(client);
        this.erreurMessage.set(null);
      },
      error: () => {
        this.clientDetecte.set(null);
        this.erreurMessage.set('Aucun client enregistré à ce numéro.');
      }
    });
  }

// Remplacer uniquement la méthode existante par cette version corrigée :
verifierDoublonEtEnregistrer() {
  this.erreurMessage.set(null);
  this.succesMessage.set(null);

  if (this.fretForm.get('modeClient')?.value === 'EXISTANT') {
    if (!this.clientDetecte()) {
      this.erreurMessage.set('Veuillez d’abord valider l’identité du client existant.');
      return;
    }
    this.soumettreEnvoiVersBase(this.clientDetecte().id);
  } else {
    // Mode Nouveau Client : Sécurité doublon
    if (this.fretForm.invalid) {
      this.fretForm.markAllAsTouched();
      this.erreurMessage.set('Le formulaire contient des erreurs de validation.');
      return;
    }

    const clientPayload = {
      nom: this.fretForm.get('nom')?.value,
      prenom: this.fretForm.get('prenom')?.value,
      email: this.fretForm.get('email')?.value,
      telephone: this.fretForm.get('telephone')?.value
    };

    this.http.post<any>(`${this.apiUrl}/clients/verifier-doublon`, clientPayload).subscribe({
      next: (res) => {
        if (res.existe) {
          // 💡 CORRECTION : On extrait .client pour enregistrer l'expéditeur en direct dans le signal
          this.clientDetecte.set(res.client); 
          this.erreurMessage.set(`🚨 Cet expéditeur existe déjà (Matricule : ${res.client.numeroClient}).`);
        } else {
          const completPayload = { 
            ...clientPayload, 
            adresse: this.fretForm.get('adresse')?.value || '', 
            dateNaissance: this.fretForm.get('dateNaissance')?.value || '' 
          };
          this.http.post<any>(`${this.apiUrl}/clients`, completPayload).subscribe({
            next: (nouveau) => this.soumettreEnvoiVersBase(nouveau.id),
            error: (err) => this.erreurMessage.set(err.error?.error || 'Erreur lors de la création du client.')
          });
        }
      }
    });
  }
}


  soumettreEnvoiVersBase(idExpediteur: string) {
    this.isLoading.set(true);
    const finalPayload = { expediteurId: idExpediteur, colisList: this.fretForm.value.colisList };

    this.http.post(`${this.apiUrl}/colis/groupe`, finalPayload).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.succesMessage.set('Bordereau multi-colis enregistré et facturé avec succès !');
        this.clientDetecte.set(null);
        this.initFormulaire();
      },
      error: (err) => {
        this.isLoading.set(false);
        this.erreurMessage.set(err.error?.error || 'Erreur lors du traitement logistique.');
      }
    });
  }

// 💡 CORRECTION : On passe le client en paramètre direct pour éviter les conflits de signaux asynchrones
forcerSelectionDoublon(clientDoublon: any) {
  if (!clientDoublon) return;
  
  // 1. Assigner d'abord le client détecté de manière stable
  this.clientDetecte.set(clientDoublon);
  
  // 2. Basculer le formulaire sur le mode existant
  this.fretForm.get('modeClient')?.setValue('EXISTANT');
  
  // 3. Injecter le matricule dans le champ de saisie
  this.fretForm.get('numeroClientSaisi')?.setValue(clientDoublon.numeroClient);
  
  // 4. Nettoyer les messages d'erreurs
  this.erreurMessage.set(null);
}

}
