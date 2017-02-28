const isLower = ch => ch.toLowerCase() === ch
const getInitialLetter = word => word[0].toUpperCase()

const splitCamelWord = word => {
  const boundaries = [0]
  const chars = word.split("")
  let lastLetter = chars[0]

  for (let i = 1; i < chars.length; i++) {
    const letter = chars[i]
    if (isLower(lastLetter) && !isLower(letter)) {
      boundaries.push(i)
    }
    lastLetter = letter
  }

  boundaries.push(chars.length)

  const words = []
  for (let i = 1; i < boundaries.length; i++) {
    const from = boundaries[i - 1]
    const to = boundaries[i]
    words.push(word.slice(from, to))
  }

  return words
}

const parse = text => text
  .split(/(?:\s|\s|-)/)
  .map(splitCamelWord)
  .reduce((ws, all) => ws.concat(all))
  .map(getInitialLetter)
  .join('')

module.exports = { parse }
