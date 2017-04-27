module.exports = class PerfectNumbers {
  classify(n) {
    if (n < 1) {
      return 'Classification is only possible for natural numbers.'
    }

    const half = Math.floor(n / 2)
    let total = half

    for (let i = 1; i < half; i++) {
      if (n % i === 0) {
        total += i
        if (total > n) {
          break
        }
      }
    }

    return total > n ? 'abundant' : (total < n ? 'deficient' : 'perfect')
  }
}
