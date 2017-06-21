const isPythagorean = (a, b, c) => a * a + b * b === c * c

const forEachTriplet = (min, max, operate) => {
  const [bmin, cmin] = [min + 1, min + 2]
  for (let c = cmin; c <= max; c++) {
    for (let b = bmin; b <= c - 1; b++) {
      for (let a = min; a <= b - 1; a++) {
        if (operate(a, b, c) === 'break') {
          break
        }
      }
    }
  }
}

const findPythagoreans = ({ maxFactor, minFactor = 1, sum = NaN }) => {
  const max = Number(maxFactor) || 1
  const min = Math.max(minFactor, 1)
  sum = Number(sum)

  const triplets = []
  const hasSum = !isNaN(sum)

  forEachTriplet(min, max, (a, b, c) => {
    const abcSum = a + b + c
    if (abcSum > sum) {
      return 'break'
    }
    if ((!hasSum || abcSum === sum) && isPythagorean(a, b, c)) {
      triplets.push(new Triplet(a, b, c))
    }
  })

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
    return isPythagorean(this.a, this.b, this.c)
  }

  toString() {
    return `Triplet(${this.a}, ${this.b}, ${this.c})`
  }
}
Triplet.where = findPythagoreans

module.exports = Triplet
