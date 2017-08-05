class NullBst {
  insert(v) { return new Bst(v) }
  each(_operate) { /* noop */ }
}

const NIL = new NullBst()

class Bst {
  constructor(data) {
    this.data = data
    this.left = this.right = NIL
  }

  insert(v) {
    if (this.data < v) {
      this.right = this.right.insert(v)
    } else {
      this.left = this.left.insert(v)
    }
    return this
  }

  each(operate) {
    this.left.each(operate)
    operate(this.data)
    this.right.each(operate)
  }
}

module.exports = Bst
