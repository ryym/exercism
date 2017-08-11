const makeArray = (len) => Array.from(Array(len))

class Queens {
  constructor({ white = [0, 3], black = [7, 3] } = {}) {
    if (white[0] === black[0] && white[1] === black[1]) {
      throw 'Queens cannot share the same space'
    }
    this.white = white
    this.black = black
  }

  canAttack() {
    const { white: w, black: b } = this
    return w[0] === b[0] || w[1] === b[1]
      || Math.abs(w[0] - b[0]) === Math.abs(w[1] - b[1])
  }

  toString() {
    const { white: w, black: b } = this
    const board = makeArray(8).map(() => makeArray(8).fill('_'))
    board[w[0]][w[1]] = 'W'
    board[b[0]][b[1]] = 'B'
    return board.map(row => row.join(' ')).join('\n') + '\n'
  }
}

module.exports = Queens
