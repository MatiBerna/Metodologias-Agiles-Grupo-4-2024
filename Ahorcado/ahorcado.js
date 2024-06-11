export class Ahorcado {
  constructor() {
    this.palabra = 'arriesgar'
    this.cantidadDeVidas = 7
    this.nombreJugador = undefined
    this.arregloSinRepetidos = [...new Set(this.palabra)].sort()
    this.estadoPalabra = Array(this.palabra.length).fill('_')
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
    letra = letra.toLowerCase()
    let acierto = false

    // Comprobar si la letra está en la palabra y actualizar el estado
    this.palabra.split('').forEach((char, index) => {
      if (char === letra) {
        this.estadoPalabra[index] = letra
        acierto = true
      }
    })

    // Mensaje de retorno basado en si la letra estaba correcta o no
    if (acierto) {
      return `Letra correcta: ${this.estadoPalabra.join(' ')}`
    } else {
      this.cantidadDeVidas -= 1
      return `Letra incorrecta, intentos restantes: ${this.cantidadDeVidas}`
    }
  }

  // arriesgarLetra(letra) {
  //   if (this.palabra.includes(letra.toLowerCase())) {
  //     return 'Letra correcta'
  //   } else {
  //     this.cantidadDeVidas -= 1
  //     return `Letra incorrecta, intentos restantes: ${this.cantidadDeVidas}`
  //   }
  // }

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

  estadoPartida() {
    // Verificar si todos los guiones bajos han sido reemplazados por letras
    if (!this.estadoPalabra.includes('_')) {
      return 'Juego ganado'
    } else if (this.cantidadDeVidas <= 0) {
      return 'Juego perdido'
    } else {
      return `Palabra: ${this.estadoPalabra}. Vidas restantes: ${this.cantidadDeVidas}`
    }
  }

  // estadoPartida() {
  //   // Si el arreglo de aciertos contiene todas las letras únicas de la palabra,
  //   // significa que todas las letras han sido adivinadas correctamente
  //   if (
  //     this.arregloSinRepetidos.length === this.arregloAciertos.length &&
  //     this.arregloSinRepetidos.every((letra) => this.arregloAciertos.includes(letra))
  //   ) {
  //     return 'Juego ganado'
  //   } else {
  //     return false
  //   }
  // }
}
