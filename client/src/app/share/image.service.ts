import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private serverUrl = 'http://localhost:3000/get-images'; // Ruta en tu servidor para obtener las imágenes

  constructor(private http: HttpClient) { }

  getImages(): Observable<string[]> {
    return this.http.get<string[]>(this.serverUrl);
  }
}