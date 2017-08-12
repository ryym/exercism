const makeRowsAndCols = (s) => {
  const rows = s.split('\n').map(r => r.split(' ').map(Number))
  const colLen = rows.length ? rows[0].length : 0
  const cols = Array.from(Array(colLen).keys()).map(i => rows.map(r => r[i]))
  return [rows, cols]
}

const findSaddlePoints = (rows, cols) => {
  const maxes = rows.map(row => Math.max(...row))
  const mins = cols.map(col => Math.min(...col))
  return rows.reduce((ps, row, ir) => row.reduce((ps, v, ic) => {
    if (maxes[ir] === v && mins[ic] === v) {
      ps.push([ir, ic])
    }
    return ps
  }, ps), [])
}

module.exports = class Matrix {
  constructor(matrix) {
    [this.rows, this.columns] = makeRowsAndCols(matrix)
    this.saddlePoints = findSaddlePoints(this.rows, this.columns)
  }
}
