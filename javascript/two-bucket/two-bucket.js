const measure = (caps, goal, filled) => {
  const initialState = [0, 0]
  initialState[filled] = caps[filled]

  const moves = makeMovesMap(caps, filled)
  const paths = [[initialState, 1]]
  let state, nMoves

  while (paths.length > 0) {
    [state, nMoves] = paths.shift()

    if (state[0] === goal || state[1] === goal) {
      return [state, nMoves]
    }

    moves[state[0]][state[1]] = nMoves

    const nextMoves = nMoves + 1
    listNextStates(state, caps).forEach(next => {
      if (moves[next[0]][next[1]] > nextMoves) {
        paths.push([next, nextMoves])
      }
    })
  }

  return [[-1, -1], -1]
}

const makeMovesMap = ([cap1, cap2], filled) => {
  const moves = Array(cap1 + 1)
  for (let i = 0; i <= cap1; i++) {
    moves[i] = Array.from(Array(cap2 + 1)).map(_ => Infinity)
  }

  // Disallow opposite starting point.
  const opp = filled === 0 ? [0, cap2] : [cap1, 0]
  moves[opp[0]][opp[1]] = -1

  return moves
}

const listNextStates = ([l1, l2], [cap1, cap2]) => {
  const one2two = Math.min(l1, cap2 - l2)
  const two2one = Math.min(cap1 - l1, l2)
  return [
    [l1 - one2two, l2 + one2two], // one -> two
    [l1 + two2one, l2 - two2one], // two -> one
    [cap1, l2], // fill one
    [l1, cap2], // fill two
    [0, l2], // empty one
    [l1, 0], // empty two
  ]
}

class TwoBucket {
  constructor(cap1, cap2, goal, starter) {
    this.capacities = [cap1, cap2]
    this.goal = goal
    this.filledAtStart = starter === 'one' ? 0 : 1
    this.goalBucket = this.otherBucket = null
  }

  moves() {
    const { capacities, goal } = this
    const [lastState, nMoves] = measure(capacities, goal, this.filledAtStart)
    const goalIdx = lastState[0] === goal ? 0 : 1
    this.goalBucket = ['one', 'two'][goalIdx]
    this.otherBucket = lastState[1 - goalIdx]

    return nMoves
  }
}

module.exports = TwoBucket
