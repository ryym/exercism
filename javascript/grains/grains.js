const bigInt = require('./big-integer')

const square = n => bigInt(2).pow(n)

module.exports = class Grains {
  constructor(nSquares = 64) {
    this.nSquares = nSquares
  }

  square(n) {
    if (this.nSquares < n) {
      throw new Error(`There are only ${this.nSquares} squares`)
    }
    return square(n - 1).toString()
  }

  total() {
    const nLargest = square(this.nSquares - 1)
    return nLargest.multiply(2).minus(1).toString()
  }
}
