import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

export class Ahorcado {
  palabra: string;
  cantidadDeVidas: number;
  nombreJugador: string | undefined;
  estadoPalabra: string[];
  puntuacion: number;
  palabrasFaciles: string[];
  palabrasIntermedias: string[];
  palabrasDificiles: string[];

  constructor(dificultad: string, palabraIngresada: string) {
    this.palabra = 'arriesgar';
    this.cantidadDeVidas = 7;
    this.nombreJugador = undefined;
    this.estadoPalabra = Array(palabraIngresada.length).fill('_');
    this.puntuacion = 0;
    this.palabrasFaciles = ['comer', 'casa', 'sol', 'gato', 'mesa', 'agua'];
    this.palabrasIntermedias = [
      'caminante',
      'humanidad',
      'elefante',
      'biblioteca',
      'computadora',
      'fotografia',
    ];
    this.palabrasDificiles = [
      'caleidoscopio',
      'hidroeléctrica',
      'jeroglífico',
      'otorrinolaringólogo',
      'anticonstitucionalidad',
    ];

    this.setPalabra(dificultad, palabraIngresada);
  }
  setPalabra(dificultad: string, palabra?: string) {
    let bancoDePalabras;
    switch (dificultad) {
      case 'facil':
        bancoDePalabras = this.palabrasFaciles;
        break;
      case 'intermedio':
        bancoDePalabras = this.palabrasIntermedias;
        break;
      case 'dificil':
        bancoDePalabras = this.palabrasDificiles;
        break;
      case '':
        bancoDePalabras = ['arriesgar'];
        break;
      default:
        throw new Error('Dificultad no valida');
    }

    const indiceAleatorio = Math.floor(Math.random() * bancoDePalabras.length);
    this.palabra = bancoDePalabras[indiceAleatorio];

    if (palabra && palabra.trim() !== '') {
      this.palabra = palabra.toLowerCase();
      this.estadoPalabra = Array(this.palabra.length).fill('_');
    }
  }

  setNombre(nombre: string) {
    if (nombre === '') {
      throw new Error('Debe ingresar un nombre valido');
    } else {
      this.nombreJugador = nombre;
      return nombre;
    }
  }

  arriesgarLetra(letra: string) {
    letra = letra.toLowerCase();
    let acierto = false;

    this.palabra.split('').forEach((char, index) => {
      if (char === letra) {
        this.estadoPalabra[index] = letra;
        acierto = true;
      }
    });

    if (acierto) {
      if (!this.estadoPalabra.includes('_')) {
        return 'Juego ganado';
      } else return `Letra correcta: ${this.estadoPalabra.join(' ')}`;
    } else {
      this.cantidadDeVidas -= 1;
      if (this.cantidadDeVidas <= 0) {
        return 'Juego perdido';
      }
      return `Letra incorrecta, intentos restantes: ${this.cantidadDeVidas}`;
    }
  }

  arriesgarPalabra(palabra: string) {
    if (palabra === this.palabra) return 'Juego ganado';
    else {
      this.cantidadDeVidas -= 2;
      if (this.cantidadDeVidas <= 0) {
        return 'Juego perdido';
      }
      return `Palabra incorrecta, intentos restantes: ${this.cantidadDeVidas}`;
    }
  }

  devuelveVidas() {
    return this.cantidadDeVidas;
  }

  estadoPartida() {
    if (!this.estadoPalabra.includes('_')) {
      return 'Juego ganado';
    } else if (this.cantidadDeVidas <= 0) {
      return 'Juego perdido';
    } else {
      return `Palabra: ${this.estadoPalabra.join(' ')}. Vidas restantes: ${
        this.cantidadDeVidas
      }`;
    }
  }

  // calcularPuntuacion() {
  //   let puntuacion = 0;
  //   const puntosPorLetra = 10;
  //   const bonificacionVictoria = 100;
  //   const penalizacionError = 5;
  //   const puntosPorVida = 20;

  //   puntuacion +=
  //     this.estadoPalabra.filter((letra) => letra !== '_').length *
  //     puntosPorLetra;

  //   if (!this.estadoPalabra.includes('_')) {
  //     puntuacion += bonificacionVictoria;
  //     puntuacion += this.cantidadDeVidas * puntosPorVida;
  //   } else {
  //     puntuacion -= (7 - this.cantidadDeVidas) * penalizacionError;
  //   }

  //   return puntuacion;
  // }
}

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [FormsModule],
})
export class AppComponent implements OnInit {
  title = 'Ahorcado';
  juego: Ahorcado;
  juegoIniciado: boolean = false;
  letra: string = '';
  palabra: string = '';
  palabraArriesgada: string = '';
  mensaje: string = '';

  constructor() {
    this.juego = new Ahorcado('', this.palabra);
  }

  ngOnInit(): void {}

  iniciarNuevaPartida(dificultad: string, palabra: string): void {
    this.juego = new Ahorcado(dificultad, palabra);
    this.juegoIniciado = true;
    this.mensaje = 'Nueva partida iniciada';
  }

  arriesgarLetra(): void {
    this.mensaje = this.juego.arriesgarLetra(this.letra);
    if (this.mensaje === 'Juego ganado' || this.mensaje === 'Juego perdido') {
      this.juegoIniciado = false;
    }
    this.letra = '';
  }

  arriesgarPalabra(): void {
    this.mensaje = this.juego.arriesgarPalabra(this.palabraArriesgada);
    if (this.mensaje === 'Juego ganado' || this.mensaje === 'Juego perdido') {
      this.juegoIniciado = false;
    }
    this.palabraArriesgada = '';
  }
}
