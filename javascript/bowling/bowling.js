// Introduced a concept of frames and fill frames.
// Though the code is longer than the previous iterations,
// this implementation is most readable and natural I think.

const N_PINS = 10
const N_FRAMES = 10

const Err = {
  TOO_FEW_ROLLS: 'Score cannot be taken until the end of the game',
  TOO_MANY_ROLLS: 'Should not be able to roll after game is over',
  TOO_MANY_PINS: 'Pin count exceeds pins on the lane'
}

const FrameType = {
  NORMAL: 'normal',
  STRIKE: 'strike',
  SPARE: 'spare',
}

const sum = (xs, valueOf = (x) => x) => xs.reduce((t, x, i) => t + valueOf(x, i), 0)

class Frame {
  constructor(idx, rolls) {
    this.rolls = rolls
    this.nRolls = rolls.length
    this.nTotalRolls = idx + rolls.length - 1
    this.nHitPins = sum(rolls)
    this.type = this.nHitPins < N_PINS
      ? FrameType.NORMAL
      : rolls.length === 1 ? FrameType.STRIKE : FrameType.SPARE
  }
}

class Bowling {
  constructor(rolls) {
    if (rolls.some(p => p < 0 || N_PINS < p)) {
      throw new Error(`Pins must have a value from 0 to ${N_PINS}`)
    }
    this.rolls = rolls
  }

  score() {
    const [frames, fillFrames] = makeFrames(this.rolls)
    const err = validateFrames(frames, fillFrames)
    if (err) {
      throw new Error(err)
    }
    return score(this.rolls, frames, fillFrames)
  }
}

const makeFrames = (rolls) => {
  const frames = []
  for (let i = 0; i < rolls.length;) {
    const nRolls = rolls[i] === N_PINS ? 1 : 2
    const frame = new Frame(i, rolls.slice(i, i + nRolls))
    frames.push(frame)
    i += nRolls
  }

  const fillFrames = frames.slice(N_FRAMES)
  return [frames.slice(0, N_FRAMES), fillFrames]
}

const validateFrames = (frames, fillFrames) => {
  if (frames.concat(fillFrames).some(f => f.nHitPins > N_PINS)) {
    return Err.TOO_MANY_PINS
  }

  if (frames.length < N_FRAMES) {
    return Err.TOO_FEW_ROLLS
  }

  const nBonusRolls = sum(fillFrames, f => f.nRolls)
  if (nBonusRolls > 2) {
    return Err.TOO_MANY_ROLLS
  }

  const lastFrame = frames[N_FRAMES - 1]
  switch (lastFrame.type) {
    case FrameType.NORMAL:
      if (nBonusRolls > 0) {
        return Err.TOO_MANY_ROLLS
      }
      break
    case FrameType.SPARE:
      if (nBonusRolls < 1) {
        return Err.TOO_FEW_ROLLS
      }
      break
    case FrameType.STRIKE:
      if (nBonusRolls < 2) {
        return Err.TOO_FEW_ROLLS
      }
  }

  return null
}

const score = (rolls, frames, fillFrames) => {
  const total = sum(frames, (f, i) => {
    const nBonus = i + 1 === N_FRAMES ? 0 : getBonusCount(f.type)
    const nextIdx = f.nTotalRolls + 1
    const bonusRolls = rolls.slice(nextIdx, nextIdx + nBonus)
    return f.nHitPins + sum(bonusRolls)
  })
  return total + sum(fillFrames, f => f.nHitPins)
}

const getBonusCount = (type) => {
  switch (type) {
    case FrameType.STRIKE: return 2
    case FrameType.SPARE: return 1
    case FrameType.NORMAL:
    default: return 0
  }
}

module.exports = Bowling
