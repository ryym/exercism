const keep = (items, p) => {
  const result = []
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    if (p(item)) {
      result.push(item)
    }
  }
  return result
}

const discard = (items, p) => keep(items, t => !p(t))

module.exports = { keep, discard }
