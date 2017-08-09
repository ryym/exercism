// Inspired by http://exercism.io/submissions/c7669f5867cf496e87587d19dff85e17

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

const SCALES = Object.freeze({
  100: 'hundred',
  1000: 'thousand',
  1000000: 'million',
  1000000000: 'billion',
})

const inEnglish = (n) => {
  if (isNaN(n) || n < 0 || 999999999999 < n) {
    throw new Error('Number must be between 0 and 999,999,999,999.')
  }
  return say(n).join(' ')
}

const say = (n) => {
  if (n < 100) {
    return [sayTens(n)]
  }
  const scale = n < 1000 ? 100 : scaleExceptTop(3, n)
  return sayWithScale(n, scale)
}

const scaleExceptTop = (i, n) => {
  const nScale = scaleOf(n)
  return Math.pow(10, nScale - (nScale % i || i))
}

const scaleOf = (n) => {
  let s = 0
  while (n > 0) {
    s += 1
    n = Math.floor(n / 10)
  }
  return s
}

const sayWithScale = (n, scale) => {
  const leftmost = Math.floor(n / scale)
  const scaleName = SCALES[scale]
  const rest = n % scale
  const restWords = rest > 0 ? say(rest) : []
  return say(leftmost).concat(scaleName).concat(restWords)
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
