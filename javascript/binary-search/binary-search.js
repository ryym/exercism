const isSorted = xs => xs.every((x, i) => i === 0 || x >= xs[i - 1])

const binSearch = (xs, e, from = 0, to = xs.length) => {
  if (from >= to) {
    return -1
  }

  const mid = Math.floor((from + to) / 2)
  if (xs[mid] === e) {
    return mid
  }

  [from, to] = e < xs[mid] ? [from, mid] : [mid + 1, to]
  return binSearch(xs, e, from, to)
}

module.exports = class BinarySearch {
  constructor(array) {
    this.array = Array.isArray(array) && isSorted(array) ? array : undefined 
  }

  indexOf(elm) {
    return this.array && binSearch(this.array, elm)
  }
}
