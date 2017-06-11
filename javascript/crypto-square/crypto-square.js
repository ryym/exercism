module.exports = class Crypto {
  constructor(text) {
    this.rawText = text
    this.text = this.normalizePlaintext()
  }

  normalizePlaintext() {
    return this.rawText.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
  }

  size() {
    return Math.ceil(Math.sqrt(this.text.length))
  }

  plaintextSegments() {
    const segs = []
    const size = this.size()
    for (let i = 0; i < this.text.length; i += size) {
      segs.push(this.text.slice(i, i + size))
    }
    return segs
  }

  ciphertext() {
    const segs = this.plaintextSegments()
    let encoded = ''
    for (let i = 0; i < segs[0].length; i++) {
      segs.forEach(seg => encoded += seg[i] || '')
    }
    return encoded
  }
}
