// XXX: Take a few seconds to solve 8 or more letters problem.
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

const findValidPattern = (data) => {
  let pattern = null
  const n = data.vars.length
  const ns = Array(n)
  const used = Array(10)

  const perm = (p) => {
    if (p === n) {
      if (data.isCandidate(ns) && isValidExpression(data, ns)) {
        pattern = ns
      }
      return
    }

    for (ns[p] = 0; ns[p] < 10; ns[p]++) {
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

  perm(0, data.vars.length)
  return pattern
}

const isValidExpression = ({ left, right }, ns) => {
  const lsum = left.reduce((t, e) => t + evaluate(e, ns), 0)
  const rsum = evaluate(right, ns)
  return lsum === rsum
}
const evaluate = (ps, ns) => ps.reduce((t, p) => t * 10 + ns[p], 0)

module.exports = solve
