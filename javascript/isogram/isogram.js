
function isIsogram(phrase) {
  const letters = phrase.replace(/(\s+|-)/g, '').toLowerCase()
  const foundLetters = new Set()

  for (const letter of letters) {
    if (foundLetters.has(letter)) {
      return false
    }
    foundLetters.add(letter)
  }
  return true
}

module.exports = class Isogram {
  constructor(phrase) {
    this._isIsogram = isIsogram(phrase)
  }

  isIsogram() {
    return this._isIsogram
  }
}
