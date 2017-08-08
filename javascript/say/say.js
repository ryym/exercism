const UNDER20 = Object.freeze([
  '',
  'one', 'two', 'three', 'four', 'five',
  'six', 'seven', 'eight', 'nine', 'ten',
  'eleven', 'twelve', 'thirteen',
  'fourteen', 'fifteen', 'sixteen',
  'seventeen', 'eighteen', 'nineteen',
])

const TENS = Object.freeze([
  '', '',
  'twenty', 'thirty', 'forty', 'fifty',
  'sixty', 'seventy', 'eighty', 'ninety',
])

const inEnglish = (n) => {
  if (isNaN(n) || n < 0 || 999999999999 < n) {
    throw new Error('Number must be between 0 and 999,999,999,999.')
  }
  if (n === 0) {
    return 'zero'
  }
  const chunks = splitToChunks(n, 3)
  return sayChunks(chunks, ['thousand', 'million', 'billion'])
}

const splitToChunks = (n, unit) => {
  const s = String(n)
  const chunks = []
  const mod = s.length % unit
  if (mod > 0) {
    chunks.push(s.slice(0, mod))
  }
  for (let i = mod; i < s.length; i += unit) {
    chunks.push(Number(s.slice(i, i + unit)))
  }
  return chunks
}

const sayChunks = (chunks, scales) => {
  const lastScaleIdx = chunks.length - 2
  return chunks.reduce((ps, n, i) => {
    if (n > 0) {
      const p = sayChunk(n, scales[lastScaleIdx - i])
      ps.push(p)
    }
    return ps
  }, []).join(' ')
}

const sayChunk = (n, scale) => {
  const p = n < 100 ? sayTens(n) : sayHundreds(n)
  return scale ? `${p} ${scale}` : p
}

const sayTens = (n) => {
  if (n < 20) {
    return UNDER20[n]
  }
  const one = n % 10
  const ten = (n - one) / 10
  const saidOne = one > 0 ? `-${UNDER20[one]}` : ''
  return `${TENS[ten]}${saidOne}`
}

const sayHundreds = (n) => {
  const ten = n % 100
  const hun = (n - ten) / 100
  return sayChunks([hun, ten], ['hundred'])
}

module.exports = {
  inEnglish,
}
