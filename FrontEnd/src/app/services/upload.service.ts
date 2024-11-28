import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UrlImage } from '../components/types/url-image';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private UrlBg = 'http://localhost:3000/change-bg/upload';

  constructor(private http: HttpClient) {
    console.log('service');
  }

  uploadImage(file: File): Observable<UrlImage> {
    const formData = new FormData();
    console.log(this.UrlBg);
    formData.append('foto', file, 'cheems.png'); // 'foto' debe coincidir con el nombre en tu backend
    console.log('formData', formData);
    console.log('file', file);

    return this.http.post<UrlImage>(this.UrlBg, formData).pipe(
      catchError((error) => {
        console.error('Error al subir la imagen', error);
        throw error;
      })
    );
  }
}
