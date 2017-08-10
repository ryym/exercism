// Mutable hash set. This simply uses an Object as a store
// so elements are compared by those `toString`ed values.
class CustomSet {
  constructor(vs) {
    this._s = {}
    this.addAll(vs)
  }

  empty() {
    return this.size() === 0
  }

  clear() {
    this._s = {}
    return this
  }

  size() {
    return this.keys().length
  }

  keys() {
    return Object.keys(this._s)
  }

  toList() {
    return this.keys().map(v => this._s[v]).sort()
  }

  contains(v) {
    return this._s.hasOwnProperty(v)
  }

  add(v) {
    this._s[v] = v
    return this
  }

  addAll(vs) {
    if (Array.isArray(vs)) {
      vs.forEach(v => this.add(v))
    }
  }

  subset(other) {
    return this.intersection(other).size() === other.size()
  }

  disjoint(other) {
    return this.intersection(other).size() === 0
  }

  eql(other) {
    return CustomSet.isCustomeSet(other)
      && this.size() === other.size()
      && this.keys().every(v => other.contains(v))
  }

  intersection(other) {
    const vs = this.keys().filter(v => other.contains(v))
    return new CustomSet(vs)
  }

  difference(other) {
    const vs = this.keys().filter(v => !other.contains(v))
    return new CustomSet(vs)
  }

  union(other) {
    this.addAll(other.keys())
    return this
  }
}

CustomSet.isCustomeSet = (obj) =>
  obj && obj.constructor && obj.constructor.name === 'CustomSet'

module.exports = CustomSet
