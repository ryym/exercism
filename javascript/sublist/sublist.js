const isSuperlist = (xs, ys) => {
  if (xs.length < ys.length) {
    return false
  }

  for (let i = 0; i < xs.length; i++) {
    if (ys.every((y, j) => y === xs[i + j])) {
      return true
    }
  }

  // Return true if both lists are empty.
  return xs.length === 0 && ys.length === 0
}

const determineRelation = (xs, ys) => {
  if (xs.length < ys.length) {
    const rel = determineRelation(ys, xs)
    return rel === 'SUPERLIST' ? 'SUBLIST' : rel
  }
  return isSuperlist(xs, ys)
    ?  xs.length === ys.length ? 'EQUAL' : 'SUPERLIST'
    : 'UNEQUAL'
}

module.exports = class List {
  constructor(array = []) {
    this.array = array
  }

  compare(other) {
    return determineRelation(this.array, other.array)
  }
}
