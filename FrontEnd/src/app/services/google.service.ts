import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GoogleService {
  private apiUrl = 'http://localhost:3000/auth'; // URL de tu backend

  constructor(private http: HttpClient, private router: Router) {}

  // Iniciar sesión con Google
  loginWithGoogle(): void {
    window.location.href = `${this.apiUrl}/google`; // Redirige al backend para iniciar sesión con Google
  }

  // Capturar el token después de la redirección
  handleAuthCallback(): void {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      localStorage.setItem('authToken', token); // Almacenar el token en localStorage
    }
  }
}
