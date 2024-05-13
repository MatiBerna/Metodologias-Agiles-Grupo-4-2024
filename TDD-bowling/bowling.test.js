import { Juego } from './bowling.js'

describe('Juego', () => {
  let miJuego

  beforeEach(() => {
    miJuego = new Juego()
  })

  test('Lose game (todos 0)', () => {
    for (let i = 0; i < 20; i++) {
      miJuego.Tirar(0)
    }
    expect(miJuego.Score()).toBe(0)
  })

  test('Testear todos 1', () => {
    for (let i = 0; i < 20; i++) {
      miJuego.Tirar(1)
    }
    expect(miJuego.Score()).toBe(20)
  })

  test('Al menos un Spare', () => {
    for (let i = 1; i <= 4; i++) miJuego.Tirar(0)
    miJuego.Tirar(5)
    miJuego.Tirar(5)
    miJuego.Tirar(3)
    for (let i = 1; i <= 13; i++) {
      miJuego.Tirar(0)
    }
    expect(miJuego.Score()).toBe(16)
  })

  test('Al menos un Strike', () => {
    for (let i = 1; i <= 4; i++) {
      miJuego.Tirar(0)
    }
    miJuego.Tirar(10)
    miJuego.Tirar(3)
    miJuego.Tirar(4)
    for (let i = 1; i <= 12; i++) {
      miJuego.Tirar(0)
    }
    expect(miJuego.Score()).toBe(24)
  })

  // test('Juego perfecto', () => {
  //   for (let i = 0; i < 12; i++) {
  //     miJuego.Tirar(10)
  //   }
  //   expect(miJuego.Score()).toBe(300)
  // })
})
