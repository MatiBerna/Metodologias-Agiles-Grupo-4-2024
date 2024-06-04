import { Ahorcado } from './ahoracado.js'

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
    const result = miAhorcado.setNombre(nombre)
    expect(result).toThrowError(/^Debe ingresar un nombre valido$/)
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
    const palabra = 'arriesgar'
    const result = miAhorcado.arriesgarPalabra(palabra)
    expect(result).toBe('Palabra incorrecta, intentos restantes: 5')
  })

  test('Arriesgar palabra y es correcta', () => {
    const palabra = 'arriesgar'
    const result = miAhorcado.arriesgarPalabra(palabra)
    expect(result).toBe('GANA')
  })

  test('Mostar vidas restantes', () => {
    const result = miAhorcado.devuelveVidas()
    expect(result).toBe(7)
  })
})
