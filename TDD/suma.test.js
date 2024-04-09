import { sumar } from './suma.js'

test('string vacio suma 0', () => {
  const cadena = ''

  const result = sumar(cadena)

  expect(result).toBe(0)
})

test('sumar 1', () => {
  const cadena = '1'

  const result = sumar(cadena)

  expect(result).toBe(1)
})

test('sumar 1 + 2', () => {
  const cadena = '1,2'

  const result = sumar(cadena)

  expect(result).toBe(3)
})

test('sumar 1 + 2 + 3 con nueva linea', () => {
  const cadena = '1,2\n3'
  const result = sumar(cadena)
  expect(result).toBe(6)
})

test('sumar 1 + 2 + 3 + 4 con delimitador presonalizado', () => {
  const cadena = '//:\n1:2:3:4'
  const result = sumar(cadena)
  expect(result).toBe(10)
})

test('sumar 1 + (-2) + 3 + 4 y resulte error', () => {
  const cadena = '1,-2,3,4'
  expect(() => {
    sumar(cadena)
  }).toThrowError(/^no se permiten numeros negativos -2$/)
})
