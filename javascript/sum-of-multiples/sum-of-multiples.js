const sumOfMultilples = (factors) => (to) => {
  const ns = Array(to).fill(0)
  factors.forEach(f => {
    let n = f
    while (n < to) {
      ns[n] = n
      n += f
    }
  })
  return ns.reduce((s, n) => s + n)
}

module.exports = fs => ({ to: sumOfMultilples(fs) })
