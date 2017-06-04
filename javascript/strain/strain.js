const makeFilter = (isTarget) => (items, p) => {
  const result = []
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    if (isTarget(p(item))) {
      result.push(item)
    }
  }
  return result
}

module.exports = {
  keep: makeFilter(b => b),
  discard: makeFilter(b => !b),
}
