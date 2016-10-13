const isShouting = s => /[A-Z]/.test(s) && s === s.toUpperCase()
const isQuestion = s => s.endsWith('?')
const isSilence = s => !/\S/.test(s)

module.exports = class Bob {
  hey(remark) {
    const s = String(remark)
    return isSilence(s) && "Fine. Be that way!"
      || isShouting(s) && "Whoa, chill out!"
      || isQuestion(s) && 'Sure.'
      || 'Whatever.'
  }
}
