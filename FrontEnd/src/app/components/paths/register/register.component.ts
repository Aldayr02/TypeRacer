import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MaterialModule } from '../../../modules/material/material.module';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ FormsModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  form: FormGroup;

  constructor(formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)]],
      confirm: ['', [Validators.required]]
    }, {
      validators: [() => this.passwordsMatch()]
    });
  }

  passwordsMatch() {
    if (!this.form) return null;
    const formValue = this.form.getRawValue();
    return formValue.password === formValue.confirm ? null : { passwordMatch: true };
  }

  register() {
    console.log('Formulario: ', this.form.value);
    if (this.form.valid) {
      console.log('Enviar datos...', this.form);
    } else {
      alert('Debes llenar todos los campos');
    }
  }

}
