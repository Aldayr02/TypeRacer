import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    this.checkForAuthToken();
  }

  checkForAuthToken(): void {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const token = params.get('token');
      console.log('Token recibido:', token); // Agrega un console.log para verificar el token

      if (token) {
        // Almacenar el token en localStorage
        localStorage.setItem('authToken', token);
        console.log('Token guardado en localStorage');
        // Si necesitas redirigir a otra página después de guardar el token:
        // this.router.navigate(['/home']);
      } else {
        console.log('No se recibió token en la URL');
      }
    }
  }
}
