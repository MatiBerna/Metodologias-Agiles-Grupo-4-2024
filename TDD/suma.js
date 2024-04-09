'use strict'

export function sumar(cadena) {
  const arrayNum = separarNumeros(cadena)
  if (cadena === '') return 0
  else {
    let suma = 0
    arrayNum.forEach((num) => {
      if (Number(num) < 0) {
        throw new Error(`no se permiten numeros negativos ${num}`)
      }
      suma += parseInt(num)
    })
    return suma
  }
}

export function separarNumeros(stringNumeros) {
  let delimitador = ',|\n'
  if (stringNumeros.startsWith('//')) {
    delimitador = stringNumeros.substring(2, 3)
    stringNumeros = stringNumeros.substring(4)
  }
  return stringNumeros.split(new RegExp(delimitador))
}
//node --experimental-vm-modules node_modules/jest/bin/jest.js
