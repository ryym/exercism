// The internal representation of roman numeral units.
// 1-9: I, V, X | 10-90: X, L, C | ..
const ONE = 'ROMAN-ONE'
const FIVE = 'ROMAN-FIVE'
const TEN = 'ROMAN-TEN'

// repeat(3, 1) -> [1, 1, 1]
const repeat = (n, value) => {
  const arr = []
  for (let i = 0; i < n; i++) {
    arr.push(value)
  }
  return arr
}

// 123 -> [1, 2, 3]
const divideToDigits = (n, nDigits) => {
  const ds = String(n).split('').map(s => Number(s))
  return repeat(nDigits - ds.length, 0).concat(ds)
}

// 3 -> [ONE, ONE, ONE]
const digitToUnits = d => {
  console.assert(0 <= d && d <= 9)
  if (d === 0) {
    return []
  }
  const nOnes = d % 5
  return nOnes === 4
    ? [ONE, d < 5 ? FIVE : TEN]
    : (d < 5 ? [] : [FIVE]).concat(repeat(nOnes, ONE))
}

// 3 -> 'III', 4 -> 'IV'
const convertDigit = (d, symbols) => {
  const units = digitToUnits(d)
  return units.map(u => symbols[u] || '').join('')
}

// [I, V, X, L, C] -> [[X, L, C], [I, V, X]]
const groupRomanSymbols = (...symbols) => {
  symbols = symbols.slice()
  const groups = []
  for (let i = 1; i < symbols.length; i += 2) {
    groups.push({
      [ONE]: symbols[i - 1],
      [FIVE]: symbols[i],
      [TEN]: symbols[i + 1],
    })
  }
  return groups.reverse()
}

// Create a converter which transforms arabic numerals to roman numerals.
const makeRomanNumConverter = (...romanSymbols) => {
  const symbolGroups = groupRomanSymbols(...romanSymbols)

  return maybeNumber => {
    const arabicN = Number(maybeNumber)
    if (Number.isNaN(arabicN)) {
      throw new Error(`${maybeNumber} is not a number`)
    }
    const digits = divideToDigits(arabicN, 4)
    const romanNs = digits.map((d, i) => convertDigit(d, symbolGroups[i]))
    return romanNs.join('')
  }
}

const toRoman = makeRomanNumConverter(
  'I', 'V', 'X',
  'L', 'C', 'D',
  'M', '?', '?'
)

module.exports = toRoman
