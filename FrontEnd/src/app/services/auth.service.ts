import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token = '';

  tokenKey: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private loginService: LoginService) {}

  login(credentials: { email: string; password: string }) {
    return this.loginService.login(credentials).pipe(
      tap((response) => {
        const token = response.token;
        this.setToken(token);
        console.log('Token guardado:', token);
      })
    );
  }

  setToken(token: string) {
    this.token = token;
    this.tokenKey.next(this.token);
    localStorage.setItem(this.token, token);
  }

  getToken() {
    return localStorage.getItem(this.token);
  }

  clearToken() {
    this.tokenKey.next('');
    localStorage.removeItem(this.token);
  }
}
