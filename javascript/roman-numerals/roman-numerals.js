const makeNumeralPairs = groups => {
  const pairs = [[1, groups[0][0]]]
  return groups.reduce((p, [one, five, ten], i) => {
    const d = Math.pow(10, i)
    return p.concat([
      [d * 4, one + five],
      [d * 5, five],
      [d * 9, one + ten],
      [d * 10, ten],
    ]) 
  }, pairs)
}

// [[1000, 'M'], [900, 'CM'], [500, 'D'], ..]
const numeralPairs = makeNumeralPairs([
  ['I', 'V', 'X'],
  ['X', 'L', 'C'],
  ['C', 'D', 'M'],
]).reverse()

const toRoman = arabicN => {
  const convert = (arabTotal, romanTotal, i) => {
    const [arab, roman] = numeralPairs[i]
    if (arabTotal === 0) {
      return romanTotal
    }
    return arab <= arabTotal
      ? convert(arabTotal - arab, romanTotal + roman, i)
      : convert(arabTotal, romanTotal, i + 1)
  }
  return convert(arabicN, '', 0)
}

module.exports = toRoman
