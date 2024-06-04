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
})
