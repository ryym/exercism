// const toDecimal = bin => {
//   const max = bin.length - 1
//   let n = 0
//   for (let d = max; d >= 0; d--) {
//     n += Number(bin[max - d]) * Math.pow(2, d)
//   }
//   return n
// }

const toDecimal = (bin, d = bin.length - 1, n = 0) => {
  if (d < 0) {
    return n
  }
  const v = Number(bin[bin.length - 1 - d]) * Math.pow(2, d)
  return toDecimal(bin, d - 1, n + v)
}

const isValidBin = bin => /^[01]+$/.test(bin)

module.exports = class Binary {
  constructor(bin) {
    this.bin = bin
  }

  toDecimal() {
    return isValidBin(this.bin) ? toDecimal(this.bin) : 0
  }
}
