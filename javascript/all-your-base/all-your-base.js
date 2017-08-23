const byBase10 = (ns, b) => ns.reduce((t, n) => t * b + n, 0)

const byBase = (b, n, rems = []) => n < b
  ? rems.concat(n).reverse()
  : byBase(b, Math.floor(n / b), rems.concat(n % b))

const isValidInput = (ns, b) => ns.length > 0
  && (ns.length === 1 || ns[0] > 0)
  && ns.every(n => 0 <= n && n < b)

const isValidBase = (b) => b > 1 && b % 1 === 0

module.exports = class Converter {
  convert(ns, from, to) {
    if (!isValidBase(from)) {
      throw new Error('Wrong input base')
    }

    if (!isValidBase(to)) {
      throw new Error('Wrong output base')
    }

    if (!isValidInput(ns, from)) {
      throw new Error('Input has wrong format')
    }

    const nBase10 = byBase10(ns, from)
    return byBase(to, nBase10)
  }
}
