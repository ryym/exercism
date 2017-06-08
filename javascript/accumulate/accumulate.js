module.exports = function accumulate(xs, f, ys = []) {
  // for (let i = 0; i < xs.length; i++) {
  //   ys.push(f(xs[i]))
  // }
  // return ys

  if (ys.length >= xs.length) {
    return ys
  }
  // We can't use `concat` because it flattens a given value if it is an array.
  ys.push(f(xs[ys.length]))
  return accumulate(xs, f, ys)
}
