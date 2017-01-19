const isSameCountsPerChar = (countsA, countsB) => {
  return Object.keys(countsA).every(ch => {
    return countsA[ch] === countsB[ch]
  })
}

const getCountsPerChar = chars => chars.reduce((counts, ch) => {
  counts[ch] = (counts[ch] || 0) + 1
  return counts
}, {})

const makeIsAnagram = rawWord => {
  const word = rawWord.toLowerCase()
  const expectedChars = word.split('')
  const expectedCounts = getCountsPerChar(expectedChars)
  const validChars = new Set(expectedChars)
  const isValidChar = ch => validChars.has(ch)

  const isAnagram = rawCandidate => {
    if (rawCandidate.length !== word.length) {
      return false
    }

    const candidate = rawCandidate.toLowerCase()
    if (candidate === word) {
      return false
    }

    const candidateChars = candidate.split('')
    if (! candidateChars.every(isValidChar)) {
      return false
    }

    const actualCounts = getCountsPerChar(candidateChars)
    return isSameCountsPerChar(actualCounts, expectedCounts)
  }

  return isAnagram
}

const normalizeArgs = args => {
  if (args.length > 1) {
    return args
  }
  const arg = args[0]
  if (Array.isArray(arg)) {
    return arg
  }
  else if (typeof arg === 'string') {
    return [arg]
  }
  throw new Error(`matches: Invalid argument: ${arg}`)
}

module.exports = class Anagram {
  constructor(word) {
    this._word = word
  }

  matches(...args) {
    const candidates = normalizeArgs(args)
    const isAnagram = makeIsAnagram(this._word)
    return candidates.filter(isAnagram)
  }
}
