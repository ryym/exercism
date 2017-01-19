// Reference: http://exercism.io/submissions/cf262bf9285647d89ee7d3d41acda41d

const capitalize = s => s[0].toUpperCase() + s.slice(1)

class BeerSong {
  verse(nBottles) {
    const bottles = this._bottles(nBottles)
    const nextBottles = this._bottles(this._nextBottlesCount(nBottles))
    const refrainSentence = this._refrain(nBottles)

    return [
      `${capitalize(bottles)} of beer on the wall, ${bottles} of beer.`,
      `${refrainSentence}, ${nextBottles} of beer on the wall.`
    ].join('\n') + '\n'
  }

  _refrain(nBottles) {
    return nBottles === 0
      ? `Go to the store and buy some more`
      : `Take ${nBottles === 1 ? 'it' : 'one'} down and pass it around`
  }

  _bottles(nBottles) {
    return nBottles === 1
      ? '1 bottle'
      : `${nBottles || 'no more'} bottles`
  }

  // if the number of bottles is 0, returns MAX_N_BOTTLES.
  _nextBottlesCount(nBottles) {
    const { MAX_N_BOTTLES } = BeerSong
    return (nBottles + MAX_N_BOTTLES) % (MAX_N_BOTTLES + 1)
  }

  sing(nBottlesStart, nBottlesEnd = 0) {
    const nStart = Math.min(nBottlesStart, BeerSong.MAX_N_BOTTLES)
    const nEnd = Math.max(nBottlesEnd, 0)

    const verses = []
    for (let n = nStart; n >= nEnd; n--) {
      verses.push(this.verse(n))
    }
    return verses.join('\n')
  }
}

BeerSong.MAX_N_BOTTLES = 99

module.exports = BeerSong
