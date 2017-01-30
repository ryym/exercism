const DEFAULT_MIDDLE_CHAIN = [
  ['bird', 'How absurd to swallow a bird!'],
  ['cat', 'Imagine that, to swallow a cat!'],
  ['dog', 'What a hog, to swallow a dog!'],
  ['goat', 'Just opened her throat and swallowed a goat!'],
  ['cow', "I don't know how she swallowed a cow!"],
]

const SENTENCES = {
  ABOUT_SPIDER: 'wriggled and jiggled and tickled inside her.',
  CLOSING: "I don't know why she swallowed the fly. Perhaps she'll die.",
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

    this.comments = [null, `It ${SENTENCES.ABOUT_SPIDER}`]
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
      `I know an old lady who swallowed a ${this.animals[idx]}.`,
      ...this.composeSection(idx)
    ]
    return section.join('\n') + '\n'
  }

  composeSection(idx) {
    if (idx === this.animals.length - 1) {
      return ["She's dead, of course!"]
    }
    const comment = this.comments[idx]
    const reasons = this.composeReasons(idx)
    return (comment ? [comment] : []).concat(reasons).concat(SENTENCES.CLOSING)
  }

  composeReasons(idx) {
    const reasons = []
    for (let i = idx; i > 0; i--) {
      const [catchee, catcher] = this.animals.slice(i - 1, i + 1)
      const sentence = [
        `She swallowed the ${catcher} to catch the ${catchee}`,
        catchee === 'spider' ? ` that ${SENTENCES.ABOUT_SPIDER}` : '.',
      ].join('')
      reasons.push(sentence)
    }
    return reasons
  }
}
