import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckAuthService {
  private authStatusSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public authStatus$ = this.authStatusSubject.asObservable();

  constructor() {
    this.checkAuthentication();
  }

  // Verifica el estado de autenticación
  private checkAuthentication() {
    if (
      typeof window !== 'undefined' &&
      typeof window.localStorage !== 'undefined'
    ) {
      const authToken = localStorage.getItem('authToken');
      this.authStatusSubject.next(!!authToken); // Actualiza el estado de autenticación
    }
  }

  // Función de logout
  logout() {
    if (
      typeof window !== 'undefined' &&
      typeof window.localStorage !== 'undefined'
    ) {
      localStorage.removeItem('authToken'); // Elimina el token de localStorage
      this.authStatusSubject.next(false); // Actualiza el estado de autenticación
    }
  }
}
