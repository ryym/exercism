const CHAR_a = 'a'.charCodeAt(0)
const CHAR_z = 'z'.charCodeAt(0)

const encode = (text) => {
  const chars = text
    .toLowerCase()
    .split('')
    .filter(c => /[a-z0-9]/.test(c))
    .map(encodeChar)
  return groupChars(chars).join(' ')
}

const encodeChar = (char) => {
  const code = char.charCodeAt(0)
  return CHAR_a <= code && code <= CHAR_z
    ? String.fromCharCode(CHAR_a + (CHAR_z - code))
    : char
}

const groupChars = (chars) => {
  const groups = []
  const len = chars.length
  for (let i = 0; i < len; i += 5) {
    const group = chars.slice(i, Math.min(i + 5, len))
    groups.push(group.join(''))
  }
  return groups
}

module.exports = { encode }
