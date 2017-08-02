const pascalsTriangle = (nRows, rows = []) => {
  if (nRows <= 0) {
    return rows
  }

  const next = []
  if (rows.length === 0) {
    next.push(1)
  } else {
    const prev = rows[rows.length - 1]
    for (let i = 0; i <= prev.length; i++) {
      const v = (prev[i - 1] || 0) + (prev[i] || 0)
      next.push(v)
    }
  }

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
