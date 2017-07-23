const evaluate = (cmd, a, b) => {
  switch (cmd) {
    case 'plus':
      return a + b
    case 'minus':
      return a - b
    case 'multiplied by':
      return a * b
    case 'divided by':
      return a / b
  }
  return null
}

const compute = (acc, q) => {
  if (!q) {
    return acc
  }

  const m = q.match(/ (plus|minus|multiplied by|divided by) (-?\d+)/)
  if (m == null) {
    throw new ArgumentError()
  }

  const [exp, cmd, n] = m
  const result = evaluate(cmd, acc, Number(n))
  const rest = q.slice(exp.length)
  return compute(result, rest)
}

class WordProblem {
  constructor(question) {
    this.question = question
  }

  answer() {
    const m = this.question.match(/^What is (-?\d+)(.+)\?$/)
    if (m == null) {
      throw new ArgumentError()
    }
    const [acc, q] = m.slice(1, 3)
    return compute(Number(acc), q)
  }
}

class ArgumentError {}

module.exports = { WordProblem, ArgumentError }
