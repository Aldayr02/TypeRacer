import { Component, OnInit } from '@angular/core';
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
  selector: 'app-signup',
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
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  signup() {
    if (this.form.valid) {
      console.log('Enviar datos...', this.form);
      const credentials = {
        username: this.form.value.email,
        password: this.form.value.password,
      };
      this.authService.login(credentials).subscribe((response) => {
        console.log('Respuesta del servidor:', response);
      });
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
    console.log('Token recibido:', token); // Agrega un console.log para verificar el token
    if (token) {
      // Almacenar el token en localStorage
      localStorage.setItem('authToken', token);
      console.log('Token guardado en localStorage');
      // Redirigir al usuario a la página /home
      window.location.href = 'http://localhost:4200/home'; // Aquí cambia la ruta de destino
    } else {
      console.log('No se recibió token en la URL');
    }
  }
}
