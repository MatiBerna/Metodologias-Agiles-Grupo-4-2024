import { Component } from '@angular/core';
import { AhorcadoService } from './ahorcado.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  dificultad: string = '';
  palabraIngresada: string = '';
  letra: string = '';
  mensaje: string = '';
  vidas: number=7;
  estado: string='';
  puntuacion: number=0;
  juegoIniciado: boolean = false;

  constructor(private ahorcadoService: AhorcadoService) { }

  iniciarJuego() {
    this.ahorcadoService.iniciarJuego(this.dificultad, this.palabraIngresada).subscribe(response => {
      this.mensaje = response.mensaje;
      this.estado = response.estado;
      this.getVidas();
      this.juegoIniciado = true;
    }, error => {
      console.error('Error al iniciar el juego:', error);
    });
  }

  arriesgarLetra() {
    this.ahorcadoService.arriesgarLetra(this.letra).subscribe(response => {
      this.mensaje = response.resultado;
      this.estado = response.estado;
      this.getVidas();
      this.getPuntuacion();
    }, error => {
      console.error('Error al arriesgar letra:', error);
    });
  }

  arriesgarPalabra() {
    this.ahorcadoService.arriesgarPalabra(this.palabraIngresada).subscribe(response => {
      this.mensaje = response.resultado;
      this.estado = response.estado;
      this.getVidas();
      this.getPuntuacion();
    }, error => {
      console.error('Error al arriesgar palabra:', error);
    });
  }

  getVidas() {
    this.ahorcadoService.getVidas().subscribe(response => {
      this.vidas = response.vidas;
    }, error => {
      console.error('Error al obtener vidas:', error);
    });
  }

  getEstado() {
    this.ahorcadoService.getEstado().subscribe(response => {
      this.estado = response.estado;
    }, error => {
      console.error('Error al obtener estado:', error);
    });
  }

  getPuntuacion() {
    this.ahorcadoService.getPuntuacion().subscribe(response => {
      this.puntuacion = response.puntuacion;
    }, error => {
      console.error('Error al obtener puntuación:', error);
    });
  }
}
