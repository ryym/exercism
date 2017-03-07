const bufferEmptyException = () => new Error('The buffer is empty')
const bufferFullException = () => new Error('The buffer is full')

class CircularBuffer {
  constructor(maxSize) {
    this._maxSize = maxSize
    this.clear()

    this.write = this.write.bind(this)
    this.read = this.read.bind(this)
  }

  write(value) {
    if (value != null) {
      if (this.isFull()) {
        throw bufferFullException()
      }
      this.forceWrite(value)
    }
  }

  forceWrite(value) {
    const tail = (this._head + this._length) % this._maxSize
    this._buf[tail] = value

    if (this.isFull()) {
      this._inclHead()
    } else {
      this._length += 1
    }

    return value
  }

  read() {
    if (this.isEmpty()) {
      throw bufferEmptyException()
    }

    const value = this._buf[this._head]
    delete this._buf[this._head]
    this._inclHead()
    this._length -= 1

    return value
  }

  clear() {
    this._head = 0
    this._length = 0
    this._buf = new Array(this._maxSize)
  }

  isEmpty() {
    return this._length === 0
  }

  isFull() {
    return this._length === this._maxSize
  }

  _inclHead() {
    this._head = (1 + this._head + this._maxSize) % this._maxSize
  }
}

module.exports = {
  circularBuffer: maxSize => new CircularBuffer(maxSize),
  bufferEmptyException,
  bufferFullException,
}
