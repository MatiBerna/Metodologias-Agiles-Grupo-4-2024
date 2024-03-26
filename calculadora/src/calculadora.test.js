import { sumar } from './calculadora.js'

test('adds 1 + 2 to equal 3', () => {
  const x = 1
  const y = 2

  const result = sumar(x, y)

  expect(result).toBe(3)
})
