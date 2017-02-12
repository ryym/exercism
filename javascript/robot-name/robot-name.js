const LETTERS = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
]

const makeRangedRandom = max => () => Math.floor(Math.random() * max)

const makeRandomLetterMaker = () => {
  const random = makeRangedRandom(26)
  return () => LETTERS[random()]
}

const makeRandomDigitMaker = () => {
  const random = makeRangedRandom(10)
  return () => random()
}

const makeRandomNameMaker = (getLetter, getDigit) => () => [
  getLetter(),
  getLetter(),
  getDigit(),
  getDigit(),
  getDigit(),
].join('')

const makeRobotNameMaker = usedNames => {
  const getLetter = makeRandomLetterMaker()
  const getDigit = makeRandomDigitMaker()
  const makeName = makeRandomNameMaker(getLetter, getDigit)
  const makeUniqueName = () => {
    const name = makeName()
    if (! usedNames[name]) {
      usedNames[name] = true
      return name
    }
    return makeUniqueName()
  }
  return makeUniqueName
}

const sharedUsedNames = {}

module.exports = class Robot {
  constructor(usedNames = sharedUsedNames) {
    this.makeRandomName = makeRobotNameMaker(usedNames)
    this.reset()
  }

  reset() {
    this.name = this.makeRandomName()
  }
}
