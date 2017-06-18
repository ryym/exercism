const isValid = (value) => {
  if (!/^[0-9 ]+$/.test(value)) {
    return false
  }

  const ns = value.replace(/\s+/g, "").split('').map(Number)
  const shouldDouble = idx => (ns.length - idx) % 2 === 0

  const sum = ns.reduce((s, n, i) => {
    if (shouldDouble(i)) {
      n = n * 2
      n = n < 10 ? n : n - 9
    }
    return s + n
  }, 0)

  return sum > 0 && sum % 10 === 0
}

module.exports = class Luhn {
  constructor(value) {
    this.valid = isValid(value)
  }
}
