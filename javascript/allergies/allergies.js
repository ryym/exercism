const N2ITEM = [
  'eggs',
  'peanuts',
  'shellfish',
  'strawberries',
  'tomatoes',
  'chocolate',
  'pollen',
  'cats',
].reduce((m, item, idx) => {
  m[Math.pow(2, idx)] = item
  return m
}, {})

const decomposeScore = score => {
  let log
  const ns = []
  while (score > 0) {
    log = Math.floor(Math.log(score) / Math.log(2))
    const n = Math.pow(2, log)
    ns.push(n)
    score -= n
  }
  return ns.reverse()
}

const takeWhile = (arr, p) => {
  const ret = []
  for (let i = 0; p(arr[i]) && i < arr.length; i++) {
    ret.push(arr[i])
  }
  return ret
}

class Allergies {
  constructor(score, n2item = N2ITEM) {
    const max = Number(Math.max(...Object.keys(n2item)))
    const ns = takeWhile(decomposeScore(score), n => n <= max)
    this.allergies = ns.map(n => n2item[n])
  }

  list() {
    return this.allergies
  }

  allergicTo(item) {
    return this.allergies.indexOf(item) >= 0
  }
}

module.exports = Allergies
