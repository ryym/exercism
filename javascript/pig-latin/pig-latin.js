const translate = (text) => {
  return text.split(/\s+/).map(convertWord).join(' ')
}

const convertWord = (word) => {
  const idx = findFirstVowelIndex(word)
  const suf = word.slice(0, idx)
  const mid = word.slice(idx)
  return mid + suf + 'ay'
}

const findFirstVowelIndex = (word) => {
  const matches = word.match(/^[^aeiou]+/)
  if (matches === null) {
    return 0
  }
  const nCons = matches[0].length
  const borderChars = word.slice(nCons - 1, nCons + 1)
  return borderChars === 'qu' ? nCons + 1 : nCons
}

module.exports = { translate }
