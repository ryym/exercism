module.exports = class Words {
  count(sentence) {
    // The counts must not have any properties
    // like a 'toString' function.
    const noPrototype = Object.create(null)

    return sentence
      .trim()
      .split(/\s+/)
      .map(word => word.toLowerCase())
      .reduce((counts, word) => {
        counts[word] = (counts[word] || 0) + 1
        return counts
      }, noPrototype)
  }
}
