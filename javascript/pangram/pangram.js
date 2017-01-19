function createCharRange(startChar, endChar) {
  const startCode = startChar.charCodeAt(0)
  const endCode = endChar.charCodeAt(0)
  const chars = []

  for (let c = startCode; c <= endCode; c++) {
    chars.push(String.fromCharCode(c))
  }
  return chars
}

function isPangram(sentence) {
  const alphabets = new Set(createCharRange('a', 'z'))

  for (const char of sentence.toLowerCase()) {
    alphabets.delete(char)
    if (alphabets.size === 0) {
      return true
    }
  }

  return false
}

module.exports = class Pangram {
  constructor(sentence) {
    this._isPangram = isPangram(sentence)
  }

  isPangram() {
    return this._isPangram
  }
}
