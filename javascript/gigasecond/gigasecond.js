class Gigasecond {
  constructor(date) {
    this.startDate = new Date(date)
  }

  date() {
    return new Date(this.startDate.getTime() + Gigasecond.GIGA_MILLISECONDS)
  }
}

Gigasecond.GIGA_MILLISECONDS = Math.pow(10, 9) * 1000

module.exports = Gigasecond
