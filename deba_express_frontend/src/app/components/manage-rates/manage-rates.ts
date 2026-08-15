import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { API_URL } from '../../app.config';

@Component({
  selector: 'app-manage-rates',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './manage-rates.html',
  styleUrl: './manage-rates.css'
})
export class ManageRatesComponent implements OnInit {
  private http = inject(HttpClient);
  private apiUrl = inject(API_URL); 
  private fb = inject(FormBuilder);

  categories = signal<any[]>([]);
  recherche = signal<string>('');
  critereTri = signal<string>('nom');
  ordreTri = signal<string>('asc');
  pageActuelle = signal<number>(1);
  elementsParPage = 4;

  catForm!: FormGroup;
  subForm!: FormGroup;
  editCatForm!: FormGroup;
  editSubForm!: FormGroup;

  modalCatSelectionnee = signal<any | null>(null);
  modalSubSelectionnee = signal<any | null>(null);

  // Signaux d'alertes et confirmations d'action
  erreurMessage = signal<string | null>(null);
  succesMessage = signal<string | null>(null);

  categoriesFiltrees = computed(() => {
    let resultat = [...this.categories()];
    const terme = this.recherche().toLowerCase().trim();
    if (terme) {
      resultat = resultat.filter(cat => 
        cat.nom.toLowerCase().includes(terme) || 
        cat.sousCategories?.some((sub: any) => sub.nom.toLowerCase().includes(terme))
      );
    }
    return resultat;
  });

  pagesTotales = computed(() => Math.ceil(this.categoriesFiltrees().length / this.elementsParPage) || 1);
  categoriesPage = computed(() => {
    const debut = (this.pageActuelle() - 1) * this.elementsParPage;
    return this.categoriesFiltrees().slice(debut, debut + this.elementsParPage);
  });

  ngOnInit() {
    this.chargerNomenclature();
    this.initFormulaires();
  }

  initFormulaires() {
    this.catForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      description: [''],
      prixUnitaire: ['', [Validators.required, Validators.min(0)]],
      mesure: ['POIDS', Validators.required]
    });

    this.subForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prixUnitaire: ['', [Validators.min(0)]], 
      mesure: ['']        
    });

    this.editCatForm = this.fb.group({
      id: [''],
      nom: ['', [Validators.required, Validators.minLength(2)]],
      description: [''],
      prixUnitaire: ['', [Validators.required, Validators.min(0)]],
      mesure: ['', Validators.required]
    });

    this.editSubForm = this.fb.group({
      id: [''],
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prixUnitaire: ['', [Validators.min(0)]],
      mesure: ['']
    });
  }

  nettoyerMessages() {
    this.erreurMessage.set(null);
    this.succesMessage.set(null);
  }

  chargerNomenclature() {
    this.http.get<any[]>(`${this.apiUrl}/categories`).subscribe(data => this.categories.set(data));
  }

  creerCategorie() {
    this.nettoyerMessages();
    if (this.catForm.invalid) {
      this.catForm.markAllAsTouched();
      return;
    }
    this.http.post(`${this.apiUrl}/categories`, this.catForm.value).subscribe({
      next: (res: any) => {
        this.chargerNomenclature();
        this.succesMessage.set(`La catégorie racine "${res.nom}" a été créée avec succès !`);
        this.catForm.reset({ mesure: 'POIDS' });
      },
      error: (err) => this.erreurMessage.set(err.error?.error || 'Échec de la création.')
    });
  }

  creerSousCategorie(catId: string) {
    this.nettoyerMessages();
    if (this.subForm.invalid) {
      this.subForm.markAllAsTouched();
      return;
    }
    const payload = { ...this.subForm.value, categorieId: catId };
    this.http.post(`${this.apiUrl}/sous-categories`, payload).subscribe({
      next: (res: any) => {
        this.chargerNomenclature();
        this.succesMessage.set(`La sous-catégorie "${res.nom}" a été ajoutée.`);
        this.subForm.reset({ mesure: '' });
      },
      error: (err) => this.erreurMessage.set(err.error?.error || 'Échec de l\'ajout.')
    });
  }

  ouvrirModaleCat(cat: any) {
    this.nettoyerMessages();
    this.modalCatSelectionnee.set(cat);
    this.editCatForm.patchValue({
      id: cat.id,
      nom: cat.nom,
      description: cat.description,
      prixUnitaire: cat.prixUnitaire,
      mesure: cat.mesure
    });
    this.editCatForm.enable();
  }

  sauvegarderCategorie() {
    if (this.editCatForm.invalid) {
      this.editCatForm.markAllAsTouched();
      return;
    }
    const id = this.editCatForm.value.id;
    this.http.put(`${this.apiUrl}/categories/${id}`, this.editCatForm.value).subscribe({
      next: (res: any) => {
        this.chargerNomenclature();
        this.modalCatSelectionnee.set(null);
        this.succesMessage.set(`La catégorie "${res.nom}" a été modifiée.`);
      },
      error: (err) => alert(err.error?.error || 'Erreur lors de la modification.')
    });
  }

  ouvrirModaleSub(sub: any) {
    this.nettoyerMessages();
    this.modalSubSelectionnee.set(sub);
    this.editSubForm.patchValue({
      id: sub.id,
      nom: sub.nom,
      prixUnitaire: sub.prixUnitaire === null ? '' : sub.prixUnitaire,
      mesure: sub.mesure === null ? '' : sub.mesure
    });
    this.editSubForm.enable();
  }

  sauvegarderSousCategorie() {
    if (this.editSubForm.invalid) {
      this.editSubForm.markAllAsTouched();
      return;
    }
    const id = this.editSubForm.value.id;
    this.http.put(`${this.apiUrl}/sous-categories/${id}`, this.editSubForm.value).subscribe({
      next: (res: any) => {
        this.chargerNomenclature();
        this.modalSubSelectionnee.set(null);
        this.succesMessage.set(`La sous-catégorie "${res.nom}" a été modifiée.`);
      },
      error: (err) => alert(err.error?.error || 'Erreur lors de la modification.')
    });
  }

    supprimerCat(id: string) {
    this.nettoyerMessages();
    if (!confirm('🚨 Supprimer cette catégorie et toutes ses sous-catégories ?')) return;

    this.http.delete<any>(`${this.apiUrl}/categories/${id}`).subscribe({
      next: (res) => {
        if (res.success === false) {
          // Si le backend a bloqué l'action de sécurité
          this.erreurMessage.set(res.error);
        } else {
          // Si la suppression a été validée physiquement en base
          this.chargerNomenclature();
          this.succesMessage.set(res.message);
        }
      },
      error: () => this.erreurMessage.set('Une erreur réseau est survenue.')
    });
  }

  supprimerSub(id: string) {
    this.nettoyerMessages();
    if (!confirm('Supprimer cette sous-catégorie tarifaire ?')) return;

    this.http.delete<any>(`${this.apiUrl}/sous-categories/${id}`).subscribe({
      next: (res) => {
        if (res.success === false) {
          // Si le backend a bloqué l'action de sécurité
          this.erreurMessage.set(res.error);
        } else {
          // Si la suppression a été validée physiquement en base
          this.chargerNomenclature();
          this.succesMessage.set(res.message);
        }
      },
      error: () => this.erreurMessage.set('Une erreur réseau est survenue.')
    });
  }


  toggleOrdre() {
    this.ordreTri.set(this.ordreTri() === 'asc' ? 'desc' : 'asc');
  }

  changerPage(nouvellePage: number) {
    if (nouvellePage >= 1 && nouvellePage <= this.pagesTotales()) {
      this.pageActuelle.set(nouvellePage);
    }
  }

  mathMin(a: number, b: number): number {
    return Math.min(a, b);
  }
}
