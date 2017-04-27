// REF: http://exercism.io/submissions/a8715bf7f88f4680a46facf65be6fd1d

module.exports = class PerfectNumbers {
  classify(n) {
    if (n < 1) {
      return 'Classification is only possible for natural numbers.'
    }
    const total = this.sumFactors(n)
    return total > n ? 'abundant' : (total < n ? 'deficient' : 'perfect')
  }

  sumFactors(n) {
    if (n === 1) {
      return 0
    }
    const sroot = Math.ceil(Math.sqrt(n))
    const nsToSroot = Array.from(Array(sroot).keys())
    const minFs = nsToSroot.slice(1).filter(i => n % i === 0)
    const opposites = minFs.slice(1).map(i => n / i === i ? 0 : n / i)
    return minFs.concat(opposites).reduce((a, b) => a + b)
  }
}
