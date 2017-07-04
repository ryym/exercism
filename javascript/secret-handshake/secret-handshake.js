const COMMANDS = [
  "wink",
  "double blink",
  "close your eyes",
  "jump",
]

const parseToFlags = (n, len = 5) => {
  const flags = []
  let i = 0

  while (n > 0) {
    if (n & 1) {
      flags.push(i)
    }
    n = n >> 1
    i += 1
  }

  if (i === len) {
    flags.pop()
  }
  return { flags, reverse: i === len }
}

module.exports = class SecretHandshake {
  constructor(input) {
    const n = Number(input)
    if (Number.isNaN(n)) {
      throw new Error('Handshake must be a number')
    }
    if (n < 0 || 32 <= n) {
      throw new Error(`Invalid handshake: ${n}`)
    }
    this.n = n
  }

  commands() {
    const { flags, reverse } = parseToFlags(this.n)
    const commands = flags.map(i => COMMANDS[i])
    return reverse ? commands.reverse() : commands
  }
}
