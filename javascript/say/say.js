const UNDER20 = Object.freeze([
  'zero', 'one', 'two', 'three', 'four', 'five',
  'six', 'seven', 'eight', 'nine', 'ten', 'eleven',
  'twelve', 'thirteen', 'fourteen', 'fifteen',
  'sixteen', 'seventeen', 'eighteen', 'nineteen',
])

const TENS = Object.freeze([
  null, null, 'twenty', 'thirty', 'forty',
  'fifty', 'sixty', 'seventy', 'eighty', 'ninety',
])

const SCALES = Object.freeze(['hundred', 'thousand', 'million', 'billion'])

const inEnglish = (n) => {
  if (isNaN(n) || n < 0 || 999999999999 < n) {
    throw new Error('Number must be between 0 and 999,999,999,999.')
  }
  return say(n).reverse().join(' ')
}

const say = (n, iScale = n < 1000 ? 0 : 1) => {
  if (n < 100) {
    return [sayTens(n)]
  }

  const unit = n < 1000 ? 100 : 1000
  const m = n % unit
  let next = (n - m) / unit
  while (next % unit === 0) {
    next = next / unit
    iScale += 1
  }

  const scale = SCALES[iScale % SCALES.length]
  const rest = [scale, ...say(next, iScale + 1)]
  return m === 0 ? rest : say(m).concat(rest)
}

const sayTens = (n) => {
  if (n < 20) {
    return UNDER20[n]
  }
  const one = n % 10
  const tenName = TENS[(n - one) / 10]
  return one === 0 ? tenName : `${tenName}-${UNDER20[one]}`
}

module.exports = { inEnglish }
