const DEFAULT_MIDDLE_CHAIN = [
  ['bird', 'How absurd to swallow a bird!'],
  ['cat', 'Imagine that, to swallow a cat!'],
  ['dog', 'What a hog, to swallow a dog!'],
  ['goat', 'Just opened her throat and swallowed a goat!'],
  ['cow', "I don't know how she swallowed a cow!"],
]

const sentences = {
  opening: (animal) =>
    `I know an old lady who swallowed a ${animal}.`,
  closing: () =>
    "I don't know why she swallowed the fly. Perhaps she'll die.",
  thatsAll: () =>
    "She's dead, of course!",
  swallowing: (catcher, catchee) =>
    `She swallowed the ${catcher} to catch the ${catchee}`,
  aboutSpider: () =>
    'wriggled and jiggled and tickled inside her.',
}

/**
 * Compose a song of `I know an old lady who swallowed a fly` dynamically.
 */
module.exports = class FoodChain {
  constructor(
    middleChain = DEFAULT_MIDDLE_CHAIN,
    lastAnimal = 'horse'
  ) {
    this.animals = ['fly', 'spider']
      .concat(middleChain.map(c => c[0]))
      .concat(lastAnimal)

    this.comments = [null, `It ${sentences.aboutSpider()}`]
      .concat(middleChain.map(c => c[1]))
  }

  verses(from = 1, to = this.animals.length) {
    const sections = []
    for (let i = from; i <= to; i++) {
      sections.push(this.verse(i))
    }
    return sections.join('\n') + '\n'
  }

  verse(n) {
    if (n < 1 || n > this.animals.length) {
      throw new Error('Invalid section number')
    }
    const idx = n - 1
    const section = [
      sentences.opening(this.animals[idx]),
      ...this.composeSection(idx)
    ]
    return section.join('\n') + '\n'
  }

  composeSection(idx) {
    if (idx === this.animals.length - 1) {
      return [sentences.thatsAll()]
    }
    const comment = this.comments[idx]
    const reasons = this.composeReasons(idx)
    return (comment ? [comment] : []).concat(reasons).concat(sentences.closing())
  }

  composeReasons(idx) {
    const reasons = []
    for (let i = idx; i > 0; i--) {
      const [catchee, catcher] = this.animals.slice(i - 1, i + 1)
      const reason = [
        sentences.swallowing(catcher, catchee),
        catchee === 'spider' ? ` that ${sentences.aboutSpider()}` : '.',
      ].join('')
      reasons.push(reason)
    }
    return reasons
  }
}
