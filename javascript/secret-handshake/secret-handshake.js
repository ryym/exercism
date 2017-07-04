const COMMANDS = [
  "wink",
  "double blink",
  "close your eyes",
  "jump",
]

const parseToFlags = (n, maxIdx = 4) => {
  let rem = n
  let i = 0
  const flags = []

  while (rem > 1) {
    if (rem % 2 === 1) {
      flags.push(i)
    }
    rem = Math.floor(rem / 2)
    i += 1
  }

  if (i < maxIdx && rem === 1) {
    flags.push(i)
  }
  const reverse = i === maxIdx && rem === 1
  return { flags, reverse }
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
