const factors = [
  [3, 'Pling'],
  [5, 'Plang'],
  [7, 'Plong'],
]

module.exports = class Raindrops {
  convert(n) {
    const drops = factors.reduce((ds, [f, word]) => n % f === 0 ? ds + word : ds, '')
    return drops || String(n)
  }
}
