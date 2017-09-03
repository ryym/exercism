const solve = (input) => {
  const data = parse(input)
  const pattern = findValidPattern(data)
  return pattern == null ? null : makeAnswer(data.vars, pattern)
}

const makeAnswer = (vars, ns) => vars.reduce((ans, v, i) => {
  ans[v] = ns[i]
  return ans
}, {})

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

  const left = nss.slice(0, nss.length - 1)
  const right = nss[nss.length - 1]
  return { vars, left, right, leftmosts }
}

const findValidPattern = (data) => {
  const { vars, left, right } = data

  const len = vars.length
  const ns = Array(len)
  const used = Array(10)
  const { starts, ends, maxPs } = makeOptimizedRanges(data)

  let pattern = null
  const perm = (p) => {
    if (p === len) {
      if (isValidExpression(left, right, ns)) {
        pattern = ns
      }
      return
    }

    const end = maxPs[p] == null ? ends[p] : Math.min(ns[maxPs[p]], ends[p])
    for (ns[p] = starts[p]; ns[p] < end; ns[p]++) {
      if (!used[ns[p]]) {
        used[ns[p]] = true
        perm(p + 1)
        if (pattern != null) {
          break
        }
        used[ns[p]] = false
      }
    }
  }

  perm(0)
  return pattern
}

// This aims to avoid checking unnecessary permutations.
// For example, if the expression has 'ABC',
// we only need to loop from 1 to 9 for 'A' (not from 0).
const makeOptimizedRanges = ({ vars, left, right, leftmosts }) => {
  const starts = vars.map((_, i) => leftmosts.has(i) ? 1 : 0)
  const ends = Array(vars.length).fill(10)

  // Example:
  // If the expression is 'AB + CDE == FAE',
  // 'C' must be less than or equal to 'F'.
  // In this case, maxPs is '[, ,5, , ,]' (5 is an index of 'F').
  const maxPs = Array(vars.length)

  const sameScales = left.filter(ns => ns.length >= right.length)
  if (sameScales.length === 0) {
    ends[right[0]] = left.length
  } else {
    starts[right[0]] = sameScales.length
    sameScales.forEach(ns => {
      maxPs[ns[0]] = right[0]
    })
  }

  return { starts, ends, maxPs }
}

const isValidExpression = (left, right, ns) => {
  const lsum = left.reduce((t, e) => t + evaluate(e, ns), 0)
  const rsum = evaluate(right, ns)
  return lsum === rsum
}
const evaluate = (ps, ns) => ps.reduce((t, p) => t * 10 + ns[p], 0)

module.exports = solve
