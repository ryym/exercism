// XXX: Awful implementation.

const Err = {
  TOO_FEW_ROLLS: 'Score cannot be taken until the end of the game',
  TO_MANY_ROLLS: 'Should not be able to roll after game is over',
  TOO_MANY_PINS: 'Pin count exceeds pins on the lane'
}

const score = (pins, weights, frame = 1, i = 0) => {
  if (pins.length <= i) {
    throw new Error(Err.TOO_FEW_ROLLS)
  }
  if (frame > 10) {
    throw new Error(Err.TO_MANY_ROLLS)
  }

  if (frame === 10) {
    const lastIdx = pins.length - 1

    if (pins[i] === 10) {
      if (pins[i + 1] < 10 && pins[i + 1] + pins[i + 2] > 10) {
        throw new Error(Err.TOO_MANY_PINS)
      }
    }
    else {
      if (pins[i] + pins[i + 1] < 10 && lastIdx === i + 2) {
        throw new Error(Err.TO_MANY_ROLLS)
      }
      else if (pins[i] + pins[i + 1] > 10) {
        throw new Error(Err.TOO_MANY_PINS)
      }
    }

    if (pins[i] + pins[i + 1] < 10 && lastIdx === i + 1 || lastIdx === i + 2) {
      return pins.reduce((t, p, i) => t + p * weights[i], 0)
    }
    throw new Error(Err.TOO_FEW_ROLLS)
  }

  const pin1 = pins[i]
  if (pin1 === 10) {
    weights[i + 1] += 1
    weights[i + 2] += 1
    return score(pins, weights, frame + 1, i + 1)
  }

  const pin2 = pins[i + 1]
  if (pin1 + pin2 === 10) {
    weights[i + 2] += 1
  }
  else if (pin1 + pin2 > 10) {
    throw new Error(Err.TOO_MANY_PINS)
  }

  return score(pins, weights, frame + 1, i + 2)
}

class Bowling {
  constructor(rolls) {
    if (rolls.some(p => p < 0 || 10 < p)) {
      throw new Error('Pins must have a value from 0 to 10')
    }
    this.rolls = rolls
  }

  score() {
    const weights = Array.from(Array(this.rolls.length)).map(_ => 1)
    return score(this.rolls, weights)
  }
}

module.exports = Bowling
