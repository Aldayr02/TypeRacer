import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RegisterService } from '../../../services/register.service'; // Asegúrate de que la ruta sea correcta
import { MaterialModule } from '../../../modules/material/material.module'; // Si estás usando Material

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService // Inyectamos el servicio
  ) {
    this.form = this.formBuilder.group(
      {
        name: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/),
          ],
        ],
        confirm: ['', [Validators.required]],
      },
      {
        validators: [this.passwordsMatch.bind(this)],
      }
    );
  }

  // Validador para comparar las contraseñas
  passwordsMatch(formGroup: FormGroup): { [key: string]: boolean } | null {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirm');
    if (
      password &&
      confirmPassword &&
      password.value !== confirmPassword.value
    ) {
      return { passwordMatch: true };
    }
    return null;
  }

  register() {
    if (this.form.valid) {
      // Obtener los valores del formulario
      const formData = this.form.value;
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };

      // Llamar al servicio para registrar al usuario
      this.registerService.register(userData).subscribe(
        (response) => {
          console.log('Usuario registrado exitosamente', response);
          // Aquí puedes redirigir al usuario, mostrar un mensaje de éxito, etc.
        },
        (error) => {
          console.error('Error al registrar el usuario', error);
          // Mostrar mensaje de error o manejarlo de acuerdo a lo que necesites
        }
      );
    } else {
      alert('Debes llenar todos los campos correctamente');
    }
  }
}
