module.exports = class Series {
  constructor(value) {
    if (!/^\d+$/.test(value)) {
      throw new Error(`Invalid string: ${value}`)
    }
    this.digits = value.split('').map(Number)
  }

  slices(n) {
    const { digits } = this

    if (digits.length < n) {
      throw new Error('Slice size is too big.')
    }

    const slices = []
    for (let i = 0; i <= digits.length - n; i++) {
      slices.push(digits.slice(i, i + n))
    }
    return slices
  }
}
