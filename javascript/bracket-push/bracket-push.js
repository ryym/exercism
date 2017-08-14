const PAIRS = [
  ['[', ']'],
  ['{', '}'],
  ['(', ')'],
]

module.exports = function bracket(text) {
  const stack = []
  for (const c of text.split('')) {
    for (const [left, right] of PAIRS) {
      if (c === left) {
        stack.push(left)
      } else if (c === right && stack.pop() !== left) {
        return false
      }
    }
  }

  return stack.length === 0
}
