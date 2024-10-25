import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../../modules/material/material.module';
import { AuthService } from '../../../services/auth.service';
import { response } from 'express';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ FormsModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  form: FormGroup;

  constructor(formBuilder: FormBuilder, private authService: AuthService) {
    this.form = formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  signup() {
    if (this.form.valid) {
      console.log('Enviar datos...', this.form);
      const credentials = { username: this.form.value.email, password: this.form.value.password };
      this.authService.login(credentials).subscribe(response => {
        console.log('Respuesta del servidor:', response);
      })
    } else {
      alert('Debes llenar todos los campos');
    }
  }

}
