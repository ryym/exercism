const DEFAULT_CHARS_PER_POINT = Object.freeze({
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z'],
})

const makePointPerChar = charsPerPoint => {
  return Object.keys(charsPerPoint).reduce((ppc, point) => {
    const pointNum = Number(point)
    charsPerPoint[point].forEach(char => {
      ppc[char] = pointNum
    })
    return ppc
  }, {})
}

const makeScorer = charsPerPoint => {
  const pointPerChar = makePointPerChar(charsPerPoint)
  const score = word => String(word || '')
    .split('')
    .reduce((total, char) => {
      const point = pointPerChar[char.toUpperCase()] || 0
      return total + point
    }, 0)
  return score
}

module.exports = makeScorer(DEFAULT_CHARS_PER_POINT)
