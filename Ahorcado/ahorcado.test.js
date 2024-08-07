import { Ahorcado } from './ahorcado.js'

describe('Ahorcado', () => {
  let miAhorcado

  beforeEach(() => {
    miAhorcado = new Ahorcado('', 'arriesgar')
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
    expect(result).toBe('Juego ganado. La palabra era: arriesgar')
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

    expect(result).toBe('Juego perdido. La palabra era: arriesgar')
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

    expect(result).toBe('Juego ganado. La palabra era: arriesgar')
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
    miAhorcado.setPalabra('facil')
    expect(miAhorcado.palabrasFaciles).toContain(miAhorcado.palabra)
  })

  test('Palabra random pertenece al banco de palabras para la dificultad intermedio', () => {
    const palabrasIntermedias = miAhorcado.palabrasIntermedias

    miAhorcado.setPalabra('intermedio')

    expect(palabrasIntermedias).toContain(miAhorcado.palabra)
  })

  test('Palabra random pertenece al banco de palabras para la dificultad dificil', () => {
    miAhorcado.setPalabra('dificil')
    expect(miAhorcado.palabrasDificiles).toContain(miAhorcado.palabra)
  })

  test('Palabra random no pertenece al banco de palabras', () => {
    const palabra = 'jaksd'
    let errorCapturado
    try {
      miAhorcado.setPalabra('asdj', palabra)
    } catch (error) {
      errorCapturado = error
    }
    expect(errorCapturado).toBeDefined()
    expect(errorCapturado.message).toMatch(/^Dificultad no valida$/)
  })

  test('Debería asignar la palabra "prueba"', () => {
    const palabra = 'prueba'
    miAhorcado.setPalabra('', palabra)
    expect(miAhorcado.palabra).toBe(palabra)
  })
})