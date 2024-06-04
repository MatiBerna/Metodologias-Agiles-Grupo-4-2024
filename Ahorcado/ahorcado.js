export class Ahorcado {
  constructor() {
    this.palabra = 'arriesgar'
    this.cantidadDeVidas = 7
    this.nombreJugador = undefined
    this.arregloSinRepetidos = [...new Set(palabra)].sort()
    this.arregloAciertos = []
  }

  setNombre(nombre) {
    if (nombre === '') {
      throw new Error('Debe ingresar un nombre valido')
    } else {
      this.nombreJugador = nombre
      return nombre
    }
  }

  arriesgarLetra(letra) {
    if (this.palabra.includes(letra.toLowerCase())) {
      return 'Letra correcta'
    } else {
      this.cantidadDeVidas -= 1
      return `Letra incorrecta, intentos restantes: ${this.cantidadDeVidas}`
    }
  }

  arriesgarPalabra(palabra) {
    if (palabra === this.palabra) return 'Juego ganado'
    else {
      this.cantidadDeVidas -= 2
      return `Palabra incorrecta, intentos restantes: ${this.cantidadDeVidas}`
    }
  }

  devuelveVidas() {
    return this.cantidadDeVidas
  }
}
