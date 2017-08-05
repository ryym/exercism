const isPrime = (n) => {
  for (let i = 3; i <= Math.sqrt(n); i += 2) {
    if (n % i === 0) {
      return false
    }
  }
  return true
}

const primeAt = (at) => {
  if (isNaN(at) || at <= 0) {
    throw new Error('Prime is not possible')
  }
  if (at === 1) {
    return 2
  }
  for (let i = 1, n = 3;; n += 2) {
    if (isPrime(n) && ++i === at) {
      return n
    }
  }
}

module.exports = { nth: primeAt }
