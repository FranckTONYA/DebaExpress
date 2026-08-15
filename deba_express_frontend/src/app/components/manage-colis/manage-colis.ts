import { Component, inject, signal, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { API_URL } from '../../app.config';

@Component({
  selector: 'app-manage-colis',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './manage-colis.html'
})
export class ManageColisComponent implements OnInit {
  private http = inject(HttpClient);
  private apiUrl = inject(API_URL); 
  private fb = inject(FormBuilder);

  // Signaux réactifs pour la pagination et le filtrage
  colisList = signal<any[]>([]);
  pageActuelle = signal<number>(1);
  pagesTotales = signal<number>(1);
  totalElements = signal<number>(0);

  recherche = signal<string>('');
  critereTri = signal<string>('createdAt');
  ordreTri = signal<string>('desc');

  // Modale Modification
  colisEnEdition = signal<any | null>(null);
  editForm!: FormGroup;

  ngOnInit() {
    this.chargerInventaire();
    this.editForm = this.fb.group({
      id: [''],
      description: [''],
      quantite: ['', [Validators.required, Validators.min(0.01)]],
      destination: ['', Validators.required],
      statut: ['', Validators.required],
      etatSortie: ['']
    });
  }

  chargerInventaire() {
    const url = `${this.apiUrl}/colis?page=${this.pageActuelle()}&limite=10&recherche=${this.recherche()}&tri=${this.critereTri()}&ordre=${this.ordreTri()}`;
    this.http.get<any>(url).subscribe({
      next: (res) => {
        this.colisList.set(res.data);
        this.pagesTotales.set(res.pagesTotales);
        this.totalElements.set(res.total);
      }
    });
  }

  appliquerFiltres() {
    this.pageActuelle.set(1);
    this.chargerInventaire();
  }

  changerPage(nouvellePage: number) {
    if (nouvellePage >= 1 && nouvellePage <= this.pagesTotales()) {
      this.pageActuelle.set(nouvellePage);
      this.chargerInventaire();
    }
  }

  toggleOrdre() {
    this.ordreTri.set(this.ordreTri() === 'asc' ? 'desc' : 'asc');
    this.chargerInventaire();
  }

  ouvrirModale(colis: any, edit: boolean = false) {
    this.colisEnEdition.set({ ...colis, modeLectureSeule: !edit });
    this.editForm.patchValue({
      id: colis.id,
      description: colis.description,
      quantite: colis.quantite,
      destination: colis.destination,
      statut: colis.statut,
      etatSortie: colis.etatSortie || ''
    });
    if (!edit) this.editForm.disable();
    else this.editForm.enable();
  }

  sauvegarderModif() {
    if (this.editForm.invalid) return;
    const id = this.editForm.value.id;
    this.http.put(`${this.apiUrl}/colis/${id}`, this.editForm.value).subscribe({
      next: () => {
        this.chargerInventaire();
        this.colisEnEdition.set(null);
      }
    });
  }

  supprimerColis(id: string) {
    if (!confirm('🗑️ Supprimer définitivement ce colis ? Sa facture liée sera également purgée.')) return;
    this.http.delete(`${this.apiUrl}/colis/${id}`).subscribe({
      next: () => this.chargerInventaire()
    });
  }
}
