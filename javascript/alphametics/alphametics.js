// XXX: Too slow.

const patterns = ({
  len,
  ns,
  c = 0,
  used = ns.map(() => 0),
}) => {
  const pats = []

  if (c === len) {
    return [[]]
  }

  for (let i = 0; i < ns.length; i++) {
    if (used[i] === 0) {
      const used2 = used.slice()
      used2[i] = 1
      const subpats = patterns({
        len, ns,
        used:used2,
        c: c + 1,
      })
      subpats.forEach(sp => {
        pats.push(sp.concat(i))
      })
    }
  }

  return pats
}

const parse = (exp) => {
  const chunks = exp.split(/\s\+\s|\s==\s/)

  const vars = []
  const nss = []
  const leftmosts = new Set()

  for (let chunk of chunks) {
    const ns = []
    const cs = chunk.split('')
    for (let c of cs) {
      let idx = vars.indexOf(c)
      if (idx < 0) {
        idx = vars.length
        vars.push(c)
      }
      ns.push(idx)
    }
    if (cs.length > 1) {
      leftmosts.add(vars.indexOf(cs[0]))
    }
    nss.push(ns)
  }

  const isCandidate = (ns) => {
    for (let p of leftmosts) {
      if (ns[p] === 0) {
        return false
      }
    }
    return true
  }

  const left = nss.slice(0, nss.length - 1)
  const right = nss[nss.length - 1]
  return { vars, left, right, isCandidate }
}

const listPatterns = (len) => {
  return patterns({ len, ns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] }).map(p => p.reverse())
}

const isValidExpression = (left, right, ns) => {
  const lsum = left.reduce((t, e) => t + evaluate(e, ns), 0)
  const rsum = evaluate(right, ns)
  return lsum === rsum
}
const evaluate = (ps, ns) => {
  return ps.reduce((t, p) => t * 10 + ns[p], 0)
}
const hasLeadingZero = (ns) => ns.length > 1 && ns[0] === 0

const findValidPattern = (left, right, isCandidate, ps) => {
  return ps.find(p => isCandidate(p) && isValidExpression(left, right, p))
}

const makeAnswer = (vars, ns) => {
  if (ns == null) {
    return null
  }
  return vars.reduce((ans, v, i) => {
    ans[v] = ns[i]
    return ans
  }, {})
}

const solve = (input) => {
  const { vars, left, right, isCandidate } = parse(input)
  const patterns = listPatterns(vars.length)
  const pattern = findValidPattern(left, right, isCandidate, patterns)
  return makeAnswer(vars, pattern)
}

module.exports = solve
