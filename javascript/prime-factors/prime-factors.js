const listPrimeFactors = n => {
  const factors = []
  let divisor = 2

  while (n > 1) {
    if (n % divisor === 0) {
      n = n / divisor
      factors.push(divisor)
    }
    else {
      divisor += 1
    }
  }

  return factors
}

module.exports = {
  for: listPrimeFactors,
}
