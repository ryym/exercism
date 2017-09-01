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

const toN = (ps, ns) => ps.reduce((t, p) => t * 10 + ns[p], 0)

const apply = (left, right, ns) => {
  const sum = left.reduce((t, ps) => t + toN(ps, ns), 0)
  const result = toN(right, ns)
  return [sum, result]
}

// 可能なパターンを列挙したい。
//
// 要は、0-9の数のうち n 個を選んで作れる順列の
// パターン一覧を出力できればいい。
// 
// あるいは長さが不定な2次元配列を動的にネストループしたい。
// 順列を展開した木構造のようなのが作れればできそう。
// ただこれだと同じ数値の重複を許しているし無駄がある?
// n個を選んで作れる順列をちゃんと書けるならそっちの方が良いかも。

const make = (tree, vs = []) => {
  const vss = []
  for (let [v, t] of tree) {
    if (t === undefined) {
      vss.push(vs.concat(v))
    }
    else {
      make(t, vs).forEach(vs => {
        vss.push(vs.concat(v))
      })
    }
  }
  return vss
}

// const a = [[0], [1], [2]]
// const b = [[0, a], [1, a], [2, a]]
// const c = [[0, b], [1, b], [2, b]]
// console.log(
//   make(c).map(vs => vs.reverse())
// )

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
  const nss = []
  let idx = 0
  for (let chunk of chunks) {
    const ns = []
    for (let c of chunk.split('')) {
      if (vars.indexOf(c) < 0) {
        vars.push(c)
      }
      ns.push(idx++)
    }
    nss.push(ns)
  }

  const left = nss.slice(0, nss.length - 1)
  const right = nss[nss.length - 1]
  return { vars, left, right }
}

const listPatterns = (len) => {
  // TODO
}

const isValidExpression = (left, right, ns) => {
  const lsum = left.reduce((t, e) => t + evaluate(e, ns), 0)
  const rsum = evaluate(right, ns)
  return lsum === rsum
}
const evaluate = (ps, ns) => {
  return ps.reduce((t, p) => t * 10 + ns[p], 0)
}

const findValidPattern = (left, right, ps) => {
  return ps.find(p => isValidExpression(left, right, p))
}

const makeAnswer = (vars, ns) => {
  if (pattern == null) {
    return null
  }
  return vars.reduce((ans, v, i) => {
    ans[v] = ns[i]
    return ans
  }, {})
}

const solve = (input) => {
  const { vars, left, right } = parse(input)
  const patterns = listPatterns(vars.length)
  const pattern = findValidPattern(left, right, patterns)
  return makeAnswer(vars, pattern)
}
