export class Ahorcado {
  constructor(dificultad, palabraIngresada) {
    this.palabrasFaciles = ['comer', 'casa', 'sol', 'gato', 'mesa', 'agua'];
    this.palabrasIntermedias = ['caminante', 'humanidad', 'elefante', 'biblioteca', 'computadora', 'fotografia'];
    this.palabrasDificiles = ['caleidoscopio', 'hidroeléctrica', 'jeroglífico', 'otorrinolaringólogo', 'anticonstitucionalidad'];

    this.cantidadDeVidas = 7;
    this.nombreJugador = undefined;
    this.puntuacion = 0;
    //this.estadoPalabra = Array(this.palabra.length).fill('_')
    this.setPalabra(dificultad, palabraIngresada);
  }

  setPalabra(dificultad, palabra) {
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
    }

    // Inicializar estadoPalabra basado en la palabra seleccionada
    this.estadoPalabra = Array(this.palabra.length).fill('_');
  }

  setNombre(nombre) {
    if (nombre === '') {
      throw new Error('Debe ingresar un nombre valido');
    } else {
      this.nombreJugador = nombre;
      return nombre;
    }
  }

  arriesgarLetra(letra) {
    letra = letra.toLowerCase();
    let acierto = false;

    // Comprobar si la letra está en la palabra y actualizar el estado
    this.palabra.split('').forEach((char, index) => {
      if (char === letra) {
        this.estadoPalabra[index] = letra;
        acierto = true;
      }
    });

    // Mensaje de retorno basado en si la letra estaba correcta o no
    if (acierto) {
      if (!this.estadoPalabra.includes('_')) {
        return `Partida ganada. La palabra era: ${this.palabra}`;
      } else return `Letra correcta: ${this.estadoPalabra.join(' ')}`;
    } else {
      this.cantidadDeVidas -= 1;
      if (this.cantidadDeVidas <= 0) {
        return `Juego perdido. La palabra era: ${this.palabra}`;
      }
      return `Letra incorrecta, intentos restantes: ${this.cantidadDeVidas}`;
    }
  }

  arriesgarPalabra(palabra) {
    if (palabra === this.palabra) {
      return `Juego ganado. La palabra era: ${this.palabra}`;
    } else {
      this.cantidadDeVidas -= 2;
      if (this.cantidadDeVidas <= 0) {
        return `Juego perdido. La palabra era: ${this.palabra}`;
      }
      return `Palabra incorrecta, intentos restantes: ${this.cantidadDeVidas}`;
    }
  }

  devuelveVidas() {
    return this.cantidadDeVidas;
  }

  estadoPartida() {
    if (!this.estadoPalabra.includes('_')) {
      return `Juego ganado. La palabra era: ${this.palabra}`;
    } else if (this.cantidadDeVidas <= 0) {
      return `Juego perdido. La palabra era: ${this.palabra}`;
    } else {
      return `Palabra: ${this.estadoPalabra.join(' ')}. Vidas restantes: ${this.cantidadDeVidas}`;
    }
  }

  calcularPuntuacion() {
    let puntuacion = 0;
    const puntosPorLetra = 10;
    const bonificacionVictoria = 100;
    const penalizacionError = 5;
    const puntosPorVida = 20;

    puntuacion += this.estadoPalabra.filter((letra) => letra !== '_').length * puntosPorLetra;

    if (!this.estadoPalabra.includes('_')) {
      puntuacion += bonificacionVictoria;
      puntuacion += this.cantidadDeVidas * puntosPorVida;
    } else {
      puntuacion -= (7 - this.cantidadDeVidas) * penalizacionError;
    }

    return puntuacion;
  }
}

export default Ahorcado;
