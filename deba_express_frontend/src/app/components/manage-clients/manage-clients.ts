import { Component, inject, signal, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-manage-clients',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './manage-clients.html'
})
export class ManageClientsComponent implements OnInit {
  private http = inject(HttpClient);
  private fb = inject(FormBuilder);

  clients = signal<any[]>([]);
  clientSelectionne = signal<any | null>(null); 
  isEditMode = signal<boolean>(false);
  
  clientForm!: FormGroup;
  erreurMessage = signal<string | null>(null);
  succesMessage = signal<string | null>(null);

  ngOnInit() {
    this.chargerClients();
    this.initForm();
  }

  initForm() {
    this.clientForm = this.fb.group({
      id: [''],
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, Validators.pattern('^[+]?[0-9]{8,15}$')]],
      adresse: [''],
      dateNaissance: ['', Validators.required]
    });
  }

  chargerClients() {
    this.http.get<any[]>('http://localhost:3000/api/clients')
      .subscribe({
        next: (donnees) => this.clients.set(donnees),
        error: () => this.erreurMessage.set('Erreur de chargement des clients.')
      });
  }

  ouvrirModal(client: any, editMode: boolean = false) {
    this.clientSelectionne.set(client);
    this.isEditMode.set(editMode);
    this.succesMessage.set(null);
    this.erreurMessage.set(null);

    // Formater la date en YYYY-MM-DD pour le calendrier HTML5
    const dateFormatee = client.dateNaissance ? client.dateNaissance.split('T')[0] : '';

    this.clientForm.patchValue({
      id: client.id,
      nom: client.nom,
      prenom: client.prenom,
      email: client.email,
      telephone: client.telephone,
      adresse: client.adresse,
      dateNaissance: dateFormatee
    });

    if (!editMode) {
      this.clientForm.disable();
    } else {
      this.clientForm.enable();
    }
  }

  fermerModal() {
    this.clientSelectionne.set(null);
  }

  sauvegarderClient() {
    if (this.clientForm.invalid) return;

    const id = this.clientForm.value.id;
    this.http.put(`http://localhost:3000/api/clients/${id}`, this.clientForm.value)
      .subscribe({
        next: () => {
          this.succesMessage.set('Fiche client mise à jour.');
          this.chargerClients();
          setTimeout(() => this.fermerModal(), 1200);
        },
        error: (err) => this.erreurMessage.set(err.error?.error || 'Erreur de modification.')
      });
  }

  supprimerClient(id: string) {
    if (!confirm('🚨 Confirmer la suppression définitive de ce client ?')) return;
    this.http.delete(`http://localhost:3000/api/clients/${id}`).subscribe({
      next: () => this.chargerClients(),
      error: () => alert('Erreur de suppression.')
    });
  }
}
