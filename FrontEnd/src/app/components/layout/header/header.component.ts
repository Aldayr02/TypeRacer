import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importar CommonModule
import { AuthStateDirective } from '../../../directives/auth-state.directive';
import { UploadService } from '../../../services/upload.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, AuthStateDirective],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private authStorageListener!: () => void;
  isAuthenticated: boolean = false;

  constructor(private uploadService: UploadService) {}

  ngOnInit() {
    // Verificar si estamos en el navegador
    if (typeof window !== 'undefined') {
      this.authStorageListener = () => {
        this.updateAuthStatus(); // Actualiza el estado de autenticación
      };
      window.addEventListener('storage', this.authStorageListener);
      this.updateAuthStatus(); // Inicializa el estado de autenticación al inicio
    }
  }

  ngOnDestroy() {
    // Limpiar el listener al destruir el componente
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', this.authStorageListener);
    }
  }

  // Método para comprobar el estado de autenticación
  checkAuthenticationStatus(): boolean {
    return !!localStorage.getItem('authToken');
  }

  // Método para hacer logout
  logout() {
    localStorage.removeItem('authToken'); // Elimina el token del localStorage
    this.updateAuthStatus(); // Actualiza el estado después de logout
  }

  // Método privado para actualizar el estado de autenticación
  private updateAuthStatus() {
    this.isAuthenticated = this.checkAuthenticationStatus(); // Actualiza el estado de autenticación
  }

  changeBG() {
    console.log('change');
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.click();
    fileInput.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        this.uploadService.uploadImage(file).subscribe({
          next: (response) => {
            console.log('Archivo subido con éxito:', response);
            // Aquí puedes hacer algo con la respuesta, como mostrar una notificación
          },
          error: (error) => {
            console.error('Error al subir la imagen:', error);
            // Manejar el error, como mostrar un mensaje de error en la UI
          },
        });
      }
    };
  }
}
