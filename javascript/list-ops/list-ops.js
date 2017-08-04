const push = (xs, x) => {
  xs.push(x)
  return xs
}

const foldl = (xs, acc, f, i = 0) =>
  i >= xs.length ? acc : foldl(xs, f(xs[i], acc), f, i + 1)

const append = (xs, ys) =>
  foldl(ys, xs, (y, xs) => push(xs, y))

const filter = (xs, pred) =>
  foldl(xs, [], (x, ys) => pred(x) ? push(ys ,x) : ys)

const map = (xs, f) =>
  foldl(xs, [], (x, ys) => push(ys, f(x)))

const foldr = (xs, acc, f) =>
  foldl(xs, a => a, (x, g) => a => g(f(x, a)))(acc)

const reverse = (xs) =>
  foldr(xs, [], (x, ys) => push(ys, x))

module.exports = class List {
  constructor(values = []) {
    this.values = Array.isArray(values) ? values : []
  }

  length() {
    return this.values.length
  }

  append(other) {
    return new List(append(this.values, other.values))
  }

  // XXX: What is the difference from `append`?
  concat(other) {
    return this.append(other)
  }

  filter(pred) {
    return new List(filter(this.values, pred))
  }

  map(f) {
    return new List(map(this.values, f))
  }

  foldl(f, acc) {
    return foldl(this.values, acc, f)
  }

  foldr(f, acc) {
    return foldr(this.values, acc, f)
  }

  reverse() {
    return new List(reverse(this.values))
  }
}
