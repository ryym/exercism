module.exports = class Hamming {
  compute(strand1, strand2) {
    if (strand1.length !== strand2.length) {
      throw new Error('DNA strands must be of equal length.')
    }

    const bases1 = strand1.split("")
    const bases2 = strand2.split("")
    return bases1.filter((b1, i) => b1 !== bases2[i]).length
  }
}
