const isPalindrome = (n) => {
  const s = String(n)
  for (let i = 0; i <= Math.floor(s.length / 2); i++) {
    if (s[i] !== s[s.length - 1 - i]) {
      return false
    }
  }
  return true
}

const findPalindromes = (min, max) => {
  const pls = []
  for (let a = min; a <= max; a++) {
    for (let b = a; b <= max; b++) {
      const v = a * b
      if (isPalindrome(v)) {
        pls.push(v)
      }
    }
  }
  return pls.sort((a, b) => a - b)
}

const listFactors = (n, min, max) => {
  const factors = []
  for (let i = min; i <= Math.min(Math.sqrt(n), max); i++) {
    const j = n / i
    if (n % i === 0 && j <= max) {
      factors.push([i, j])
    }
  }
  return factors
}

module.exports = class Palindromes {
  constructor({ maxFactor, minFactor }) {
    this.maxFactor = Number(maxFactor) || 1
    this.minFactor = Number(minFactor) || 1
    this.palindromes = null
  }

  generate() {
    this.palindromes = findPalindromes(this.minFactor, this.maxFactor)
  }

  largest() {
    return this._palindromeWithFactors(this.palindromes.length - 1)
  }

  smallest() {
    return this._palindromeWithFactors(0)
  }

  _palindromeWithFactors(at) {
    if (this.palindromes === null || this.palindromes.length <= at) {
      return { value: null, factors: [] }
    }
    const value = this.palindromes[at]
    const factors = listFactors(value, this.minFactor, this.maxFactor)
    return { value, factors }
  }
}
