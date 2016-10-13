module.exports = class Year {
  constructor(rawYear) {
    const year = Number(rawYear)
    console.assert(!isNaN(year), `Invalid year: ${year}`)

    this.year = year
    this._isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
  }

  isLeap() {
    return this._isLeap
  }
}
