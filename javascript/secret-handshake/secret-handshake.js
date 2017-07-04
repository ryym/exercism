const COMMANDS = [
  "wink",
  "double blink",
  "close your eyes",
  "jump",
]

const MAX_N = Math.pow(2, COMMANDS.length) * 2 - 1

const isFlagOn = (n, i) => n >> i & 1

module.exports = class SecretHandshake {
  constructor(input) {
    const n = Number(input)
    if (Number.isNaN(n)) {
      throw new Error('Handshake must be a number')
    }
    if (n < 0 || MAX_N < n) {
      throw new Error(`Invalid handshake: ${n}`)
    }
    this.n = n
  }

  commands() {
    const commands = COMMANDS.reduce((cs, command, i) => {
      isFlagOn(this.n, i) && cs.push(command)
      return cs
    }, [])

    const reverse = isFlagOn(this.n, COMMANDS.length)
    return reverse ? commands.reverse() : commands
  }
}
