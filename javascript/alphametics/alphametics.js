// 数式を解析して出現する変数の数 v を調べる
// 別の変数が同じ数字に割り当てられる事はないので、
// とりうるパターン数は 10!v になる？
//
// - 右辺の足し算結果と左辺は等しくなる
// - ある単語 (数字列) の左端が 0 になってはいけない
//    - どこか一箇所でも左端に使われている変数は 1-9 のいずれか
//
//
// 例えば 1桁と2桁の数の足し算の答えが 200 以上 (109以上) になる事はないから、
// 左辺の数が 3桁だったら、左端の数字は 1 と断定できる

// - 変数の数
// - 各変数が取りうる数字
// - 入力式をデータ化したもの
//
// e.g.)
// ABC + BDA = EDC
// left: [0, 1, 2], [1, 3, 0]
// right: [4, 3, 2]
// (a..e <-> 0..4)
// 各数字のインデックス (を反転したもの) が桁数に対応する
// これと実際に代入したい数値の配列を組み合わせれば合計値が一致するか確かめられる
// [9, 4, 5, 2, 6] -> A:9 B:4 C:5 D:2 E:6

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

// TODO: 一応これで順列作れた。
// 後はこれで作ったパターンを計算式にあてはめてみる
const ret = patterns({
  len: 2,
  ns: [0, 1, 2, 3],
})
// console.log(ret.map(a => a.reverse()))

/* ------------- */

// 'AB + CD == CE'
// vars: [A, B, C, D, E]
// left: [[0, 1], [2, 3]]
// right: [[2, 4]]
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

console.log(0)
console.log(listPatterns(7).length)

// XXX: 一応動くけどめっちゃ遅い。。10文字のクイズを解くのに30秒かかる。
// listPatterns にがっつり時間かかる
// アルゴリズムを改善すべきか、そもそも全パターンのチェックをしない方法を探すか。。
