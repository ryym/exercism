module.exports = class Matrix {
  constructor(matrix) {
    this.rows = matrix.split('\n').map(row => row.split(/\s+/).map(Number))
    this.columns = this.rows.length > 0
      ? this.rows[0].map((_, i) => this.rows.map(row => row[i]))
      : []
  }
}
