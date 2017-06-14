const getPrimesUntil = (limit) => {
  const ns = makeNumbers(2, limit)
  const marks = new Array(limit + 1)

  return ns.reduce((ps, n) => {
    if (!marks[n]) {
      ps.push(n)
      markMultiplesOf(n, marks)
    }
    return ps
  }, [])
}

const makeNumbers = (start, end) => {
  const ns = new Array(end - start + 1)
  for (let i = start; i <= end; i++) {
    ns[i - start] = i
  }
  return ns
}

const markMultiplesOf = (n, marks) => {
  for (let i = n; i < marks.length; i += n) {
    marks[i] = true
  }
}

module.exports = class Sieve {
  constructor(limit) {
    this.primes = getPrimesUntil(limit)
  }
}
