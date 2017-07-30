module.exports = class Series {
  constructor(numbers) {
    this.xs = numbers.split('').map(Number)
  }

  largestProduct(n) {
    if (typeof n !== 'number' || n < 0) {
      throw new Error('Invalid input.')
    }
    const { xs } = this

    if (xs.length < n) {
      throw new Error('Slice size is too big.')
    }
    if (xs.length === 0 || n === 0) {
      return 1
    }

    let max = 0
    for (let i = 0; i <= xs.length - n; i++) {
      const prod = xs.slice(i, i + n).reduce((a, b) => a * b)
      max = Math.max(max, prod)
    }
    return max
  }
}
