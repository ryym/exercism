const INVALID_NUMBER = '0000000000'

function normalizePhoneNumber(rawNumber) {
  const number = rawNumber.replace(/[^0-9]+/g, '')
  if (number.length === 10) {
    return number
  }
  else if (number.length === 11 && number.charAt(0) === '1') {
    return number.substr(1)
  }
  return INVALID_NUMBER
}


class PhoneNumber {
  constructor(rawNumber) {
    const number = normalizePhoneNumber(rawNumber)
    console.assert(number.length === 10)

    this._number = number
    this._areaCode = number.substr(0, 3)
    this._localNumber = number.substr(3, 3)
    this._personalNumber = number.substr(6)
  }

  number() {
    return this._number
  }

  areaCode() {
    return this._areaCode
  }

  toString() {
    return `(${this._areaCode}) ${this._localNumber}-${this._personalNumber}`
  }
}

module.exports = PhoneNumber
