module.exports = class Flattener {
  flatten(xs) {
    return !Array.isArray(xs)
      ? xs
      : xs.reduce((ys, x) =>
        x == null ? ys : ys.concat(this.flatten(x)),
        []
      )
  }
}
