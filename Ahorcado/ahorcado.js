export class Ahorcado {
  constructor() {
    this.palabra = 'arriesgar'
    this.cantidadDeVidas = 7
    this.nombreJugador = undefined
    this.arregloSinRepetidos = [...new Set(this.palabra)].sort()
    this.estadoPalabra = Array(this.palabra.length).fill('_')
    this.puntuacion = 0
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
      return `Palabra: ${this.estadoPalabra.join(' ')}. Vidas restantes: ${this.cantidadDeVidas}`
    }
  }

  calcularPuntuacion() {
    let puntuacion = 0
    const puntosPorLetra = 10
    const bonificacionVictoria = 100
    const penalizacionError = 5
    const puntosPorVida = 20

    // Sumar puntos por cada letra acertada
    puntuacion += this.estadoPalabra.filter((letra) => letra !== '_').length * puntosPorLetra

    // Verificar si se ganó el juego y aplicar bonificaciones o penalizaciones
    if (!this.estadoPalabra.includes('_')) {
      puntuacion += bonificacionVictoria // Bonificación por victoria
      puntuacion += this.cantidadDeVidas * puntosPorVida // Puntos por vidas restantes
    } else {
      // Penalización por cada letra incorrecta (vidas perdidas)
      puntuacion -= (7 - this.cantidadDeVidas) * penalizacionError
    }

    return puntuacion
  }
}
