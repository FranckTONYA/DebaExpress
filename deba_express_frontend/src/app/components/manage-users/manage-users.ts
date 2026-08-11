import { Component, inject, signal, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './manage-users.html'
})
export class ManageUsersComponent implements OnInit {
  private http = inject(HttpClient);
  private fb = inject(FormBuilder);

  utilisateurs = signal<any[]>([]);
  utilSelectionne = signal<any | null>(null);
  isEditMode = signal<boolean>(false);
  masquerMdpModale = signal<boolean>(true);

  userForm!: FormGroup;
  succesMessage = signal<string | null>(null);

  ngOnInit() {
    this.chargerUtilisateurs();
    this.initForm();
  }

  initForm() {
    this.userForm = this.fb.group({
      id: [''],
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, Validators.pattern('^[+]?[0-9]{8,15}$')]],
      adresse: [''],
      role: ['', Validators.required],
      motDePasse: ['', [Validators.minLength(6)]] // Facultatif lors de la modif
    });
  }

  toggleMasquerMdpModale() {
    this.masquerMdpModale.set(!this.masquerMdpModale());
  }

  chargerUtilisateurs() {
    this.http.get<any[]>('http://localhost:3000/api/utilisateurs')
      .subscribe({
        next: (donnees) => this.utilisateurs.set(donnees),
        error: () => alert('Privilèges insuffisants.')
      });
  }

  ouvrirModal(user: any, editMode: boolean = false) {
    this.utilSelectionne.set(user);
    this.isEditMode.set(editMode);
    this.succesMessage.set(null);

    this.userForm.patchValue({
      id: user.id,
      nom: user.nom || 'Non renseigné',
      prenom: user.prenom || 'Non renseigné',
      email: user.email,
      telephone: user.telephone,
      adresse: user.adresse || '',
      role: user.role,
      motDePasse: ''
    });

    if (!editMode) {
      this.userForm.disable();
    } else {
      this.userForm.enable();
    }
  }

  fermerModal() {
    this.utilSelectionne.set(null);
  }

  sauvegarderUtilisateur() {
    if (this.userForm.invalid) return;

    const id = this.userForm.value.id;
    this.http.put(`http://localhost:3000/api/utilisateurs/${id}`, this.userForm.value)
      .subscribe({
        next: () => {
          this.succesMessage.set('Compte de l’agent actualisé avec succès.');
          this.chargerUtilisateurs();
          setTimeout(() => this.fermerModal(), 1200);
        },
        error: () => alert('Erreur de modification.')
      });
  }

  supprimerUtilisateur(id: string) {
    if (!confirm('🛑 Révoquer définitivement les accès réseau de cet agent ?')) return;
    this.http.delete(`http://localhost:3000/api/utilisateurs/${id}`).subscribe({
      next: () => this.chargerUtilisateurs(),
      error: () => alert('Erreur de suppression.')
    });
  }
}
