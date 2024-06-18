import { Ahorcado } from './ahorcado.js'

describe('Ahorcado', () => {
  let miAhorcado

  beforeEach(() => {
    miAhorcado = new Ahorcado('')
  })

  test('Ingreso de nombre', () => {
    const nombre = 'Juan Perez'

    const result = miAhorcado.setNombre(nombre)

    expect(result).toBe(nombre)
  })

  test('Ingreso de nombre nulo', () => {
    const nombre = ''
    let errorCapturado

    try {
      miAhorcado.setNombre(nombre)
    } catch (error) {
      errorCapturado = error
    }

    expect(errorCapturado).toBeDefined()
    expect(errorCapturado.message).toMatch(/^Debe ingresar un nombre valido$/)
  })
  test('Arriesgar letra, es incorrecta y pierde 1 vida', () => {
    const letra = 'd'

    const result = miAhorcado.arriesgarLetra(letra)

    expect(result).toBe('Letra incorrecta, intentos restantes: 6')
  })

  test('Arriesgar letra y es correcta', () => {
    const letra = 'a'
    const result = miAhorcado.arriesgarLetra(letra)
    expect(result).toBe('Letra correcta: a _ _ _ _ _ _ a _')
  })

  test('Arriesgar palabra y es incorrecta', () => {
    const palabra = 'arriesgarte'
    const result = miAhorcado.arriesgarPalabra(palabra)
    expect(result).toBe('Palabra incorrecta, intentos restantes: 5')
  })

  test('Arriesgar palabra y es correcta', () => {
    const palabra = 'arriesgar'
    const result = miAhorcado.arriesgarPalabra(palabra)
    expect(result).toBe('Juego ganado')
  })

  test('Mostar vidas restantes', () => {
    const result = miAhorcado.devuelveVidas()
    expect(result).toBe(7)
  })

  test('Mostrar estado de partida perdida', () => {
    const palabra = 'ykdjzlw'
    palabra.split('').forEach((letra) => {
      miAhorcado.arriesgarLetra(letra)
    })

    const result = miAhorcado.estadoPartida()

    expect(result).toBe('Juego perdido')
  })

  test('Mostrar estado de partida en curso', () => {
    const palabra = 'aij'
    palabra.split('').forEach((letra) => {
      miAhorcado.arriesgarLetra(letra)
    })

    const result = miAhorcado.estadoPartida()

    expect(result).toBe('Palabra: a _ _ i _ _ _ a _. Vidas restantes: 6')
  })

  test('ganar partida', () => {
    const letras = ['a', 'r', 'i', 'e', 's', 'g']

    letras.forEach((letra) => miAhorcado.arriesgarLetra(letra))

    const result = miAhorcado.estadoPartida()

    expect(result).toBe('Juego ganado')
  })

  test('calcularPuntuacion devuelve la puntuación correcta al ganar', () => {
    const palabra = 'arriesgar'
    const puntuacionEsperada = 330

    palabra.split('').forEach((letra) => {
      miAhorcado.arriesgarLetra(letra)
    })

    const result = miAhorcado.calcularPuntuacion()

    expect(result).toBe(puntuacionEsperada)
  })

  test('calcularPuntuacion devuelve la puntuación correcta al perder', () => {
    const palabra = 'bfjklmn'
    const puntuacionEsperada = -35
    palabra.split('').forEach((letra) => {
      miAhorcado.arriesgarLetra(letra)
    })

    const result = miAhorcado.calcularPuntuacion()
    expect(result).toBe(puntuacionEsperada)
  })

  test('Palabra random pertenece al banco de palabras para la dificultad facil', () => {
    miAhorcado.asignarPalabra('facil')
    expect(miAhorcado.palabrasFaciles).toContain(miAhorcado.palabra)
  })

  test('Palabra random pertenece al banco de palabras para la dificultad intermedio', () => {
    const palabrasIntermedias = miAhorcado.palabrasIntermedias

    miAhorcado.asignarPalabra('intermedio')

    expect(palabrasIntermedias).toContain(miAhorcado.palabra)
  })

  test('Palabra random pertenece al banco de palabras para la dificultad dificil', () => {
    miAhorcado.asignarPalabra('dificil')
    expect(miAhorcado.palabrasDificiles).toContain(miAhorcado.palabra)
  })

  test('Palabra random no pertenece al banco de palabras', () => {
    const palabra = 'jaksd'
    let errorCapturado
    try {
      miAhorcado.asignarPalabra(palabra)
    } catch (error) {
      errorCapturado = error
    }
    expect(errorCapturado).toBeDefined()
    expect(errorCapturado.message).toMatch(/^Dificultad no valida$/)
  })

  test('El temporizador se inicializa correctamente', () => {
    miAhorcado.iniciarTimer()
    expect(miAhorcado.timer).toBeDefined()
  })

  test('El temporizador se detiene correctamente', () => {
    miAhorcado.iniciarTimer()
    miAhorcado.detenerTimer()
    expect(miAhorcado.timer).toBeNull()
  })

  test('El tiempo se agota y se pierde el juego', (done) => {
    miAhorcado.tiempoLimite = 1 // Para que el temporizador termine rápido
    miAhorcado.iniciarTimer()
    setTimeout(() => {
      const result = miAhorcado.estadoPartida()
      expect(result).toBe('Juego perdido')
      done()
    }, 1100)
  })

  test('El temporizador se detiene al ganar el juego', () => {
    const letras = ['a', 'r', 'i', 'e', 's', 'g']
    miAhorcado.iniciarTimer()

    letras.forEach((letra) => miAhorcado.arriesgarLetra(letra))

    expect(miAhorcado.timer).toBeNull()
  })
  test('El temporizador se inicializa correctamente', () => {
    miAhorcado.iniciarTimer()
    expect(miAhorcado.timer).toBeDefined()
  })

  test('El temporizador se detiene correctamente', () => {
    miAhorcado.iniciarTimer()
    miAhorcado.detenerTimer()
    expect(miAhorcado.timer).toBeNull()
  })

  test('El tiempo se agota y se pierde el juego', (done) => {
    miAhorcado.tiempoLimite = 1 // Para que el temporizador termine rápido
    miAhorcado.iniciarTimer()

    setTimeout(() => {
      const result = miAhorcado.estadoPartida()
      expect(result).toBe('Juego perdido')
      done()
    }, 1100)
  })
  test('El temporizador se detiene al ganar el juego', () => {
    const letras = ['a', 'r', 'i', 'e', 's', 'g']
    miAhorcado.tiempoLimite = 60
    miAhorcado.iniciarTimer()

    letras.forEach((letra) => miAhorcado.arriesgarLetra(letra))

    expect(miAhorcado.timer).toBeNull()
  })
})
