const N_ROWS = 4
const N_COLS = 3

const DIGIT_MAP = [[
  ' _ ',
  '| |',
  '|_|',
], [
  '   ',
  '  |',
  '  |',
], [
  ' _ ',
  ' _|',
  '|_ ',
], [
  ' _ ',
  ' _|',
  ' _|',
], [
  '   ',
  '|_|',
  '  |',
], [
  ' _ ',
  '|_ ',
  ' _|',
], [
  ' _ ',
  '|_ ',
  '|_|',
], [
  ' _ ',
  '  |',
  '  |',
], [
  ' _ ',
  '|_|',
  '|_|',
], [
  ' _ ',
  '|_|',
  ' _|',
]].reduce((dm, ls, d) => Object.assign(dm, {
  [ls.join('')]: String(d)
}), {})

const convert = (input) => {
  const linesArray = splitRows(input)
  if (!isValidInput(linesArray)) {
    throw new Error(`Invalid input: ${input}`)
  }

  const dss = linesArray.map(splitDigits)
  return dss.map(ds => ds.map(convertToDigit).join('')).join(',')
}

const convertToDigit = (d) => {
  return DIGIT_MAP[d.slice(0, 3).join('')] || '?'
}

const isValidInput = (lss) => lss.every(ls => {
  return ls.length === N_ROWS
    && ls[0].length % N_COLS === 0
    && ls.every(l => l.length === ls[0].length)
    && /^ *$/.test(ls[N_COLS])
})

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
