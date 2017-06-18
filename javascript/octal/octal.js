module.exports = class Octal {
  constructor(value) {
    this.value = /^[0-7]+$/.test(value) ? value : '0'
  }

  toDecimal() {
    return this.value.split('').reduce((t, n) => t * 8 + Number(n), 0)
  }
}
