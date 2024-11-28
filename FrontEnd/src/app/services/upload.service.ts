import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlImage } from '../components/types/url-image';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private UrlBg = 'http://localhost:3000/change-bg/upload';

  constructor(private http: HttpClient) { }

  uploadImage(file: File): Observable<UrlImage> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    console.log('formData', formData);
    console.log('file', file);

    return this.http.post<UrlImage>(this.UrlBg, formData);
  }

}
