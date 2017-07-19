const toSentence = (want, lost) => `For want of a ${want} the ${lost} was lost.`
const toFinalSentence = (want) => `And all for the want of a ${want}.`

const normalizeWords = (words) => {
  const first = words[0]
  const last = words[words.length - 1]
  if (!last.qualifier) {
    return { words, cause: first }
  }
  return {
    words: words.slice(0, words.length - 1),
    cause: `${last.qualifier} ${first}`,
  }
}

module.exports = class Proverb {
  constructor(...words) {
    if (words.length > 1) {
      Object.assign(this, normalizeWords(words))
    }
  }

  toString() {
    const { cause, words } = this
    if (!words) {
      return ""
    }

    const sentences = []
    for (let i  = 0; i < words.length - 1; i++) {
      sentences.push(toSentence(words[i], words[i + 1]))
    }
    sentences.push(toFinalSentence(cause))

    return sentences.join('\n')
  }
}
