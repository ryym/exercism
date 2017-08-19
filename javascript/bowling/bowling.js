// Refactored and some responsibilities are separated.
// However the readability is still not so good
// (Especially of `assertRollSets`).

const Err = {
  TOO_FEW_ROLLS: 'Score cannot be taken until the end of the game',
  TOO_MANY_ROLLS: 'Should not be able to roll after game is over',
  TOO_MANY_PINS: 'Pin count exceeds pins on the lane'
}

const RollType = {
  NORMAL: 'normal',
  STRIKE: 'strike',
  SPARE: 'spare',
}

const getRollType = (rolls, nPins) => {
  if (nPins < 10) {
    return RollType.NORMAL
  }
  return rolls.length === 1 ? RollType.STRIKE : RollType.SPARE
}

class RollSet {
  constructor(idx, rolls) {
    this.idx = idx + rolls.length - 1
    this.rolls = rolls
    this.total = rolls.reduce((a, b) => a + b)
    this.type = getRollType(rolls, this.total)
  }
}

class Bowling {
  constructor(rolls) {
    if (rolls.some(p => p < 0 || 10 < p)) {
      throw new Error('Pins must have a value from 0 to 10')
    }
    this.rolls = rolls
  }

  score() {
    const rollSets = makeRollSets(this.rolls)
    assertRollSets(rollSets, this.rolls.length)
    return score(rollSets, this.rolls)
  }
}

const makeRollSets = (rolls) => {
  const rollSets = []
  let set
  for (let i = 0; i < rolls.length;) {
    const nRolls = rolls[i] === 10 || i === rolls.length - 1 ? 1 : 2
    const set = rolls.slice(i, i + nRolls)
    rollSets.push(new RollSet(i, set))
    i += set.length
  }
  return rollSets
}

const assertRollSets = (rollSets, nRolls) => {
  if (rollSets.some(s => s.total > 10)) {
    throw new Error(Err.TOO_MANY_PINS)
  }

  if (rollSets.length < 10) {
    throw new Error(Err.TOO_FEW_ROLLS)
  }

  if (rollSets.length > 12) {
    throw new Error(Err.TOO_MANY_ROLLS)
  }

  // Assert the 10th frame.
  const [s1, s2, s3] = rollSets.slice(9)

  // If the 10th roll set is a spare or strike, fill balls exist.
  if (s1.type !== RollType.NORMAL && !s2) {
    throw new Error(Err.TOO_FEW_ROLLS)
  }

  // If the 10th roll set is a strike, next 2 rolls exist.
  if (s1.type === RollType.STRIKE && s1.idx >= nRolls - 2) {
    throw new Error(Err.TOO_FEW_ROLLS)
  }

  // Fill balls do not exist if the 10th frame is not a spare nor strike.
  const prevLast = rollSets[rollSets.length - 2]
  if (rollSets.length > 10 && prevLast.type === RollType.NORMAL) {
    throw new Error(Err.TOO_MANY_ROLLS)
  }
}

const score = (rollSets, rolls) => {
  let total = 0
  for (let i = 0; i < 9; i++) {
    const s = rollSets[i]
    const [n1, n2] = rolls.slice(s.idx + 1 , s.idx + 3)
    switch (s.type) {
      case RollType.STRIKE:
        total += n2
      case RollType.SPARE:
        total += n1
      case RollType.NORMAL:
        total += s.total
    }
  }
  return rollSets.slice(9).reduce((t, s) => t + s.total, total)
}

module.exports = Bowling
