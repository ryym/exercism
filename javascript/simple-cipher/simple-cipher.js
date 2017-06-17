const CH_CODE_a = 'a'.charCodeAt(0)
const N_ALPHAS = 26

const getRandomInt = max => Math.floor(Math.random() * max)

const makeRandomKey = (size = 10) => {
  const chars = []
  for (let i = 0; i < size; i++) {
    const offset = getRandomInt(N_ALPHAS)
    chars.push(String.fromCharCode(CH_CODE_a + offset))
  }
  return chars.join('')
}

const getAlphaIndex = ch => ch.charCodeAt(0) - CH_CODE_a

const shiftChar = (ch, n) => {
  const pos = ch.charCodeAt(0) - CH_CODE_a
  const offset = n < 0 ? N_ALPHAS + n : n
  const shiftedPos = (pos + offset) % N_ALPHAS
  return String.fromCharCode(CH_CODE_a + shiftedPos)
}

const shiftChars = (text, offsets) => {
  return text.split('').map((ch, i) => shiftChar(ch, offsets[i])).join('')
}

class Cipher {
  constructor(key) {
    if (key != null && !/^[a-z]+$/.test(key)) {
      throw new Error('Bad key')
    }
    this.key = key || makeRandomKey()
  }

  encode(text) {
    const offsets = this.key.split('').map(getAlphaIndex)
    return shiftChars(text, offsets)
  }

  decode(text) {
    const offsets = this.key.split('').map(getAlphaIndex).map(n => -n)
    return shiftChars(text, offsets)
  }
}

module.exports = Cipher
