const DIGIT_MAP = 'abcdef'.split('').reduce((m, c, i) => {
  m[c] = 10 + i
  return m
}, {})

module.exports = class Hexadecimal {
  constructor(hex) {
    hex = hex.toLowerCase()
    this.hex = /^[0-9a-f]+$/.test(hex) ? hex : '0'
  }

  toDecimal() {
    return this.hex.split('').reduce((sum, h) => {
      const n = DIGIT_MAP[h] || Number(h)
      return sum * 16 + n
    }, 0)
  }
}
