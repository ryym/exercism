const MINUTES_PER_DAY = 60 * 24

const pad = val => {
  const t = String(val)
  return t.length === 1 ? `0${t}` : t
}

const turnClockHands = minutes => {
  const ms = minutes % MINUTES_PER_DAY + (minutes < 0 ? MINUTES_PER_DAY : 0)
  const minute = ms % 60
  const hour = (ms - minute) / 60
  return { hour, minute }
}

class Clock {
  constructor(minutes) {
    const { hour, minute } = turnClockHands(minutes)
    this._hour = hour
    this._minute = minute
  }

  get hour() {
    return this._hour
  }

  get minute() {
    return this._minute
  }

  toMinutes() {
    return this.hour * 60 + this.minute
  }

  plus(added) {
    const minutes = this.toMinutes() + added
    return new Clock(minutes)
  }

  minus(minutes) {
    return this.plus(-minutes)
  }

  toString() {
    return `${pad(this.hour)}:${pad(this.minute)}`
  }

  equals(clock) {
    if (clock instanceof Clock) {
      return this.hour === clock.hour && this.minute === clock.minute
    }
    return false
  }
}

const at = (hour, minute = 0) => {
  const minutes = hour * 60 + minute
  return new Clock(minutes)
}

module.exports = { at }
