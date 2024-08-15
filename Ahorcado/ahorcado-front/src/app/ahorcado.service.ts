import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AhorcadoService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  iniciarJuego(dificultad: string, palabraIngresada: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/iniciar-juego`, {
      dificultad,
      palabraIngresada,
    });
  }

  arriesgarLetra(letra: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/arriesgar-letra`, { letra });
  }

  arriesgarPalabra(palabra: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/arriesgar-palabra`, { palabra });
  }

  getVidas(): Observable<any> {
    return this.http.get(`${this.baseUrl}/vidas`);
  }

  getEstado(): Observable<any> {
    return this.http.get(`${this.baseUrl}/estado`);
  }

  getPuntuacion(): Observable<any> {
    return this.http.get(`${this.baseUrl}/puntuacion`);
  }
}
