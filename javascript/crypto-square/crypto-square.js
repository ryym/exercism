module.exports = class Crypto {
  constructor(text) {
    this.rawText = text
    this.text = this.normalizePlaintext()
  }

  normalizePlaintext() {
    return this.rawText.replace(/[^a-zA-Z0-9]/g, "").toLowerCase()
  }

  size() {
    const len = this.text.length
    return Math.ceil(Math.sqrt(len))
  }

  plaintextSegments() {
    let text = this.text
    const size = this.size()
    const segs = []
    while (text.length > 0) {
      segs.push(text.slice(0, size))
      text = text.slice(size)
    }
    return segs
  }

  ciphertext() {
    const segs = this.plaintextSegments()
    let text = ""
    for (let i = 0; i < segs[0].length; i++) {
      segs.forEach(seg => text += seg[i] || "")
    }
    return text
  }
}
