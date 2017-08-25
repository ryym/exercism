const countNeighborMines = (rows, ir, ic) => {
  return rows.slice(Math.max(ir - 1, 0), ir + 2).reduce((n, row) => {
    const cs = row.split('').slice(Math.max(ic - 1, 0), ic + 2)
    return n + cs.filter(c => c === '*').length
  }, 0)
}

module.exports = class Minesweeper {
  annotate(rows) {
    const results = []
    for (let ir = 0; ir < rows.length; ir++) {
      const row = rows[ir].split('').slice()
      for (let ic = 0; ic < row.length; ic++) {
        if (row[ic] !== '*') {
          row[ic] = countNeighborMines(rows, ir, ic) || ' '
        }
      }
      results.push(row.join(''))
    }
    return results
  }
}
