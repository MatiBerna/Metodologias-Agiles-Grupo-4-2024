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
  juegoTerminado: boolean = false;

  constructor(private ahorcadoService: AhorcadoService) { }

  iniciarJuego() {
    this.ahorcadoService.iniciarJuego(this.dificultad, this.palabraIngresada).subscribe(response => {
      this.mensaje = response.mensaje;
      this.estado = response.estado;
      this.palabraIngresada = '';
      this.getVidas();
      this.juegoIniciado = true;
    }, error => {
      console.error('Error al iniciar el juego:', error);
    });
  }

  arriesgarLetra() {
    if (this.juegoTerminado) return; // Evitar seguir jugando si el juego ha terminado
  
    this.ahorcadoService.arriesgarLetra(this.letra).subscribe(response => {
      this.mensaje = response.resultado;
      this.estado = response.estado;
  
      if (this.mensaje.includes("Juego ganado") || this.mensaje.includes("Juego perdido")) {
        this.juegoTerminado = true; // Marcar el juego como terminado
      }
      this.getVidas();
      this.getPuntuacion();
    }, error => {
      console.error('Error al arriesgar letra:', error);
    });
  }
  
  arriesgarPalabra() {
    if (this.juegoTerminado) return; // Evitar seguir jugando si el juego ha terminado
  
    this.ahorcadoService.arriesgarPalabra(this.palabraIngresada).subscribe(response => {
      this.mensaje = response.resultado;
      this.estado = response.estado;
  
      if (this.mensaje.includes("Juego ganado") || this.mensaje.includes("Juego perdido")) {
        this.juegoTerminado = true; // Marcar el juego como terminado
      }
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

  reiniciarJuego() {
    // Resetear todas las variables
    this.palabraIngresada = '';
    this.dificultad = '';
    this.letra = '';
    this.mensaje = '';
    this.estado = '';
    this.vidas = 7;
    this.puntuacion = 0;
    this.juegoIniciado = false;
    this.juegoTerminado = false;
  }


}


