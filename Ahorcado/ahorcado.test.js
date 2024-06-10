import { Ahorcado } from './ahorcado.js'

describe('Ahorcado', () => {
  let miAhorcado

  beforeEach(() => {
    miAhorcado = new Ahorcado()
  })

  test('Ingreso de nombre', () => {
    const nombre = 'Juan Perez'

    const result = miAhorcado.setNombre(nombre)

    expect(result).toBe(nombre)
  })

  test('Ingreso de nombre nulo', () => {
    const nombre = ''
    let errorCapturado

    // Intenta ejecutar la función y captura el error si se lanza
    try {
      miAhorcado.setNombre(nombre)
    } catch (error) {
      errorCapturado = error
    }

    // Realiza la aserción en el error capturado
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
    expect(result).toBe('Letra correcta')
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

  // test('ganar partida', () => {
  //   const letras = ['a', 'r', 'i', 'e', 's', 'g']
  //   let result

  //   for (i = 0; i < 6; i++) {
  //     result = miAhorcado.arriesgarLetra(letras[i])
  //   }

  //   expect(result).toBe('Juego ganado')
  // })
})
