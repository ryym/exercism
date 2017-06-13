module.exports = class Trinary {
  constructor(value) {
    this.value = this.isValidTrinary(value) ? value : ''
  }

  toDecimal() {
    //ref: http://exercism.io/submissions/ed42e0100312446f897c59d58d78553e
    return this.value.split('').reduce((d, ch) => d * 3 + Number(ch) * 1, 0)
  }

  isValidTrinary(value) {
    return /^[012]+$/.test(value)
  }
}
