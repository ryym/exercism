const CHAR_CODE_A = 'A'.charCodeAt()

const makeDiamond = (c) => {
  const halfHeight = c.charCodeAt() - CHAR_CODE_A + 1
  const height = halfHeight * 2 - 1
  const rows = Array(height)
  for (let i = 0; i < halfHeight; i++) {
    const len = 2 * i + 1
    const line = makeLine(i, len)
    const spaces = ' '.repeat((height - len) / 2)
    const row = `${spaces}${line}${spaces}`
    rows[i] = rows[height - i - 1] = row
  }
  return rows.join('\n') + '\n'
}

const makeLine = (idx, len) => {
  const c = String.fromCharCode(CHAR_CODE_A + idx)
  return len === 1 ? c : `${c}${' '.repeat(len - 2)}${c}`
}

module.exports = class Diamond {
  makeDiamond(alphabet) {
    return makeDiamond(alphabet.toUpperCase())
  }
}
