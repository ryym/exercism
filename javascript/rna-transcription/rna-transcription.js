module.exports = class DataTranscriber {
  toRna(strand) {
    if (!strand) {
      return ''
    }
    return strand.split('').map(this._convert).join('')
  }

  _convert(nuc) {
    switch (nuc) {
    case 'G': return 'C'
    case 'C': return 'G'
    case 'T': return 'A'
    case 'A': return 'U'
    }
  }
}
