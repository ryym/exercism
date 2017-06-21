const findPythagoreans = ({ maxFactor, minFactor = 1, sum }) => {
  const max = Number(maxFactor) || 1
  const min = Math.max(minFactor, 1)
  const maxSq = max * max
  const triplets = []

  for (let a = min; a < max - 1; a++) {
    for (let b = a + 1; b < max; b++) {
      const abSq = a * a + b * b
      if (abSq > maxSq) {
        break
      }
      let c = Math.sqrt(abSq)
      if (c === Math.floor(c)) {
        triplets.push(new Triplet(a, b, c))
      }
    }
  }

  sum = Number(sum)
  if (!isNaN(sum)) {
    return triplets.filter(t => t.sum() === sum)
  }
  return triplets
}

class Triplet {
  constructor(a, b, c) {
    [a, b, c] = [a, b, c].sort((x, y) => x - y)
    this.a = a
    this.b = b
    this.c = c
  }

  sum() {
    return this.a + this.b + this.c
  }

  product() {
    return this.a * this.b * this.c
  }

  isPythagorean() {
    const { a, b, c } = this
    return a * a + b * b === c * c
  }

  toString() {
    return `Triplet(${this.a}, ${this.b}, ${this.c})`
  }
}
Triplet.where = findPythagoreans

module.exports = Triplet
