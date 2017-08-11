// ref: http://exercism.io/submissions/cc02531fd852476daa6fe1170c8b47c8

const sumOfMultilples = (factors) => (to) => {
  return Array.from(Array(to).keys())
    .filter(n => factors.some(f => n % f === 0))
    .reduce((s, n) => s + n)
}

module.exports = fs => ({ to: sumOfMultilples(fs) })
