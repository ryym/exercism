const makeNextRow = (prev) => {
  const next = []

  next.push(prev[0])
  for (let i = 1; i < prev.length; i++) {
    next.push(prev[i - 1] + prev[i])
  }
  next.push(prev[prev.length - 1])

  return next
}

const pascalsTriangle = (nRows) => {
  rows = []
  for (let i = 0; i < nRows; i++) {
    const prev = rows[rows.length - 1]
    rows.push(prev ? makeNextRow(prev) : [1])
  }
  return rows
}

module.exports = class Triangle {
  constructor(nRows) {
    this.nRows = nRows
    this.rows = pascalsTriangle(nRows)
  }

  get lastRow() {
    return this.rows[this.nRows - 1]
  }
}
