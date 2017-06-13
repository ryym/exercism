module.exports = class Trinary {
  constructor(value) {
    this.value = this.isValidTrinary(value) ? value : ''
  }

  toDecimal() {
    return this.value.split('').reverse().reduce(
      (d, ch, i) => d + Number(ch) * Math.pow(3, i),
      0
    )
  }

  isValidTrinary(value) {
    return /^[012]+$/.test(value)
  }
}
