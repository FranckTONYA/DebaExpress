import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { API_URL } from '../../app.config';

@Component({
  selector: 'app-public-tracking',
  standalone: true,
  imports: [FormsModule, DatePipe, RouterLink],
  templateUrl: './public-tracking.html'
})
export class PublicTrackingComponent {
  private http = inject(HttpClient);
  private apiUrl = inject(API_URL); 

  codeSaisi = signal<string>('');
  colisTrouve = signal<any | null>(null);
  
  erreurMessage = signal<string | null>(null);
  isLoading = signal<boolean>(false);

  rechercherSuivi() {
    const code = this.codeSaisi().trim().toUpperCase();
    if (!code) return;

    this.isLoading.set(true);
    this.erreurMessage.set(null);
    this.colisTrouve.set(null);

    // 💡 Appel de la route publique du backend
    this.http.get<any>(`${this.apiUrl}/public/suivi/${code}`).subscribe({
      next: (colis) => {
        this.isLoading.set(false);
        this.colisTrouve.set(colis);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.erreurMessage.set(err.error?.error || "Code introuvable ou expédition archivée.");
      }
    });
  }
}
