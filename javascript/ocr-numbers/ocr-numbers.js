const toBin = (ns) => ns.reduce((t, n) => t * 2 + n, 0)

const N_ROWS = 4
const N_COLS = 3

// Represents a picture as a binary.
// Each bit represents a position of a picture:
// 0 1 2
// 3 4 5
// 6 7 8
const ZERO  = toBin([0, 1, 0, 1, 0, 1, 1, 1, 1])
const ONE   = toBin([0, 0, 0, 0, 0, 1, 0, 0, 1])
const TWO   = toBin([0, 1, 0, 0, 1, 1, 1, 1, 0])
const THREE = toBin([0, 1, 0, 0, 1, 1, 0, 1, 1])
const FOUR  = toBin([0, 0, 0, 1, 1, 1, 0, 0, 1])
const FIVE  = toBin([0, 1, 0, 1, 1, 0, 0, 1, 1])
const SIX   = toBin([0, 1, 0, 1, 1, 0, 1, 1, 1])
const SEVEN = toBin([0, 1, 0, 0, 0, 1, 0, 0, 1])
const EIGHT = toBin([0, 1, 0, 1, 1, 1, 1, 1, 1])
const NINE  = toBin([0, 1, 0, 1, 1, 1, 0, 1, 1])

const DIGIT_MAP = [
  ZERO, ONE, TWO, THREE, FOUR, FIVE, SIX, SEVEN, EIGHT, NINE,
].reduce((dm, bin, d) =>
  Object.assign(dm, { [bin]: String(d) }),
  {}
)

const convert = (input) => {
  const linesArray = splitRows(input)
  if (!isValidInput(linesArray)) {
    throw new Error(`Invalid input: ${input}`)
  }

  const dss = linesArray.map(splitDigits)
  return dss.map(ds => ds.map(convertToDigit).join('')).join(',')
}

const convertToDigit = (d) => {
  const bin = toBin(linesToBits(d))
  return DIGIT_MAP[bin] || '?'
}

const isValidInput = (lss) => lss.every(ls => {
  return ls.length === N_ROWS
    && ls[0].length % N_COLS === 0
    && ls.every(l => l.length === ls[0].length)
    && /^ *$/.test(ls[N_COLS])
})

const linesToBits = (lines) => {
  return lines.slice(0, N_COLS).reduce((all, l) => {
    const bs = l.split('').map(c => c === ' ' ? 0 : 1)
    return all.concat(bs)
  }, [])
}

const splitRows = (s) => {
  const ss = s.split('\n')
  const lss = []
  for (let i = 0; i < ss.length; i += N_ROWS) {
    lss.push(ss.slice(i, i + N_ROWS))
  }
  return lss
}

const splitDigits = (lines) => {
  const ds = []
  for (let i = 0; i < lines[0].length; i += N_COLS) {
    const d = lines.map(r => r.slice(i, i + N_COLS))
    ds.push(d)
  }
  return ds
}

module.exports = { convert }
