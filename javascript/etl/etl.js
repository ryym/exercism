module.exports = class ETL {
  transform(lettersPerScore) {
    return Object.keys(lettersPerScore).reduce((scoresPerLetter, score) => {
      lettersPerScore[score].forEach(letter => {
        scoresPerLetter[letter.toLowerCase()] = Number(score)
      })
      return scoresPerLetter
    }, {})
  }
}
