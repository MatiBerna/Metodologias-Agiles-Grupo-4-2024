export class Juego {
  constructor() {
    this.puntaje = 0
    this.tiros = []
  }

  Tirar(pinos) {
    //this.puntaje = 0 --> 1er test
    //this.puntaje += pinos --> 2do test
    this.tiros.push(pinos)
    this.puntaje += pinos

    this.Spare(pinos)
    this.Strike(pinos)

    //si hizo strike, añade un 0 al array
    if (this.tiros.length % 2 === 1 && pinos === 10) {
      this.tiros.push(0)
      this.Strike(0)
    }
  }

  Spare(pinos) {
    let length = this.tiros.length
    if (length % 2 === 1 && this.tiros[length - 2] + this.tiros[length - 3] === 10 && this.tiros[length - 2] !== 0) {
      this.puntaje += pinos
    }
  }
  //10 0 10 0 10 0
  //
  //
  Strike(pinos) {
    let length = this.tiros.length
    if (this.tiros.length % 2 === 0 && this.tiros[this.tiros.length - 4] === 10) {
      if (pinos === 0) {
        this.puntaje += this.tiros[length - 2] + this.tiros[length - 4]
      } else this.puntaje = this.puntaje + pinos + this.tiros[this.tiros.length - 2]
    }
  }

  Score() {
    //return 0 --> 1er test
    return this.puntaje
  }
}
