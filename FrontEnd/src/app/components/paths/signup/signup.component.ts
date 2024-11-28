import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MaterialModule } from '../../../modules/material/material.module';
import { AuthService } from '../../../services/auth.service';
import { GoogleService } from '../../../services/google.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  form: FormGroup;

  constructor(
    formBuilder: FormBuilder,
    private authService: AuthService,
    private googleService: GoogleService
  ) {
    this.form = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    if (this.form.valid) {
      console.log('Formulario válido:', this.form.value);
      const credentials = {
        email: this.form.value.email,
        password: this.form.value.password,
      };
      console.log(credentials);

      // Llamamos al servicio de login
      this.authService.login(credentials).subscribe(
        (response) => {
          console.log('Usuario autenticado exitosamente', response);
          // Guardamos el token en localStorage (o donde lo necesites)
          localStorage.setItem('authToken', response.token);
          // Redirigir al usuario o mostrar mensaje de éxito
          window.location.href = 'http://localhost:4200/home';
        },
        (error) => {
          console.log(error);
          console.error('Error al autenticar al usuario', error);
          alert('Credenciales incorrectas');
        }
      );
    } else {
      alert('Debes llenar todos los campos');
    }
  }

  loginWithGoogle(): void {
    this.googleService.loginWithGoogle();
  }

  checkForAuthToken(): void {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    console.log('Token recibido:', token);
    if (token) {
      localStorage.setItem('authToken', token);
      console.log('Token guardado en localStorage');
      window.location.href = 'http://localhost:4200/home';
    } else {
      console.log('No se recibió token en la URL');
    }
  }
}
