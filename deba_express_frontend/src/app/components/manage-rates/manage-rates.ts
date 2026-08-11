import { Component, inject, signal, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-rates',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './manage-rates.html',
  styleUrl: './manage-rates.css'
})
export class ManageRatesComponent implements OnInit {
  private http = inject(HttpClient);
  private fb = inject(FormBuilder);

  categories = signal<any[]>([]);
  
  catForm!: FormGroup;
  subForm!: FormGroup;
  editCatForm!: FormGroup;
  editSubForm!: FormGroup;

  // Signaux pour le contrôle d'ouverture des modales de modification
  modalCatSelectionnee = signal<any | null>(null);
  modalSubSelectionnee = signal<any | null>(null);

  erreurMessage = signal<string | null>(null);
  succesMessage = signal<string | null>(null);

  ngOnInit() {
    this.chargerNomenclature();
    this.initFormulaires();
  }

  initFormulaires() {
    this.catForm = this.fb.group({
      nom: ['', Validators.required],
      description: [''],
      prixUnitaire: ['', [Validators.required, Validators.min(0)]],
      mesure: ['POIDS', Validators.required]
    });

    this.subForm = this.fb.group({
      nom: ['', Validators.required],
      prixUnitaire: [''], // Optionnel (null = héritage)
      mesure: ['']        // Optionnel (null = héritage)
    });

    this.editCatForm = this.fb.group({
      id: [''],
      nom: ['', Validators.required],
      description: [''],
      prixUnitaire: ['', [Validators.required, Validators.min(0)]],
      mesure: ['X', Validators.required]
    });

    this.editSubForm = this.fb.group({
      id: [''],
      nom: ['', Validators.required],
      prixUnitaire: [''],
      mesure: ['']
    });
  }

  chargerNomenclature() {
    this.http.get<any[]>('http://localhost:3000/api/categories').subscribe({
      next: (data) => this.categories.set(data),
      error: () => this.erreurMessage.set('Erreur lors du chargement de la grille tarifaire.')
    });
  }

  creerCategorie() {
    if (this.catForm.invalid) return;
    this.http.post('http://localhost:3000/api/categories', this.catForm.value).subscribe({
      next: () => {
        this.chargerNomenclature();
        this.catForm.reset({ mesure: 'POIDS' });
        this.succesMessage.set('Catégorie racine ajoutée.');
      },
      error: (err) => this.erreurMessage.set(err.error?.error || 'Échec de la création.')
    });
  }

  creerSousCategorie(catId: string) {
    if (this.subForm.invalid) return;
    const payload = { ...this.subForm.value, categorieId: catId };
    this.http.post('http://localhost:3000/api/sous-categories', payload).subscribe({
      next: () => {
        this.chargerNomenclature();
        this.subForm.reset({ examen: '', mesure: '' });
      },
      error: (err) => alert(err.error?.error)
    });
  }

  ouvrirModaleCat(cat: any) {
    this.modalCatSelectionnee.set(cat);
    this.editCatForm.patchValue({
      id: cat.id,
      nom: cat.nom,
      description: cat.description,
      prixUnitaire: cat.prixUnitaire,
      mesure: cat.mesure
    });
  }

  sauvegarderCategorie() {
    if (this.editCatForm.invalid) return;
    const id = this.editCatForm.value.id;
    this.http.put(`http://localhost:3000/api/categories/${id}`, this.editCatForm.value).subscribe({
      next: () => {
        this.chargerNomenclature();
        this.modalCatSelectionnee.set(null);
      }
    });
  }

  ouvrirModaleSub(sub: any) {
    this.modalSubSelectionnee.set(sub);
    this.editSubForm.patchValue({
      id: sub.id,
      nom: sub.nom,
      prixUnitaire: sub.prixUnitaire === null ? '' : sub.prixUnitaire,
      mesure: sub.mesure === null ? '' : sub.mesure
    });
  }

  sauvegarderSousCategorie() {
    if (this.editSubForm.invalid) return;
    const id = this.editSubForm.value.id;
    this.http.put(`http://localhost:3000/api/sous-categories/${id}`, this.editSubForm.value).subscribe({
      next: () => {
        this.chargerNomenclature();
        this.modalSubSelectionnee.set(null);
      }
    });
  }

  supprimerCat(id: string) {
    if (confirm('🚨 Supprimer cette catégorie et toutes ses sous-catégories ?')) {
      this.http.delete(`http://localhost:3000/api/categories/${id}`).subscribe(() => this.chargerNomenclature());
    }
  }

  supprimerSub(id: string) {
    if (confirm('Supprimer cette sous-catégorie tarifaire ?')) {
      this.http.delete(`http://localhost:3000/api/sous-categories/${id}`).subscribe(() => this.chargerNomenclature());
    }
  }
}
