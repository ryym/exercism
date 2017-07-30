module.exports = class Series {
  constructor(numbers) {
    this.ns = numbers.split('').map(Number)
  }

  largestProduct(slice) {
    if (typeof slice !== 'number' || slice < 0) {
      throw new Error('Invalid input.')
    }
    const { ns } = this

    if (ns.length < slice) {
      throw new Error('Slice size is too big.')
    }
    if (ns.length === 0 || slice === 0) {
      return 1
    }

    let max = 0
    for (let i = 0; i <= ns.length - slice; i++) {
      const prod = ns.slice(i, i + slice).reduce((a, b) => a * b)
      max = Math.max(max, prod)
    }
    return max
  }
}
