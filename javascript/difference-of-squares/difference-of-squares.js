const numsUntil = n => {
  const ns = []
  for (let i = 1; i <= n; i++) {
    ns.push(i)
  }
  return ns
}
const sum = ns => ns.reduce((s, n) => s + n, 0)
const square = n => Math.pow(n, 2)

module.exports = class Squares {
  constructor(n) {
    const ns = numsUntil(n)
    this.squareOfSums = square(sum(ns))
    this.sumOfSquares = sum(ns.map(square))
    this.difference = this.squareOfSums - this.sumOfSquares
  }
}
