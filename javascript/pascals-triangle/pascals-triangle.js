const makeNextRow = (prev) => {
  const next = []

  next.push(prev[0])
  for (let i = 1; i < prev.length; i++) {
    next.push(prev[i - 1] + prev[i])
  }
  next.push(prev[prev.length - 1])

  return next
}

const pascalsTriangle = (nRows, rows = []) => {
  if (nRows <= 0) {
    return rows
  }
  const prev = rows[rows.length - 1]
  const next = prev ? makeNextRow(prev) : [1]
  return pascalsTriangle(nRows - 1, [...rows, next])
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
