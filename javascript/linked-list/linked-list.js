const insertAfter = (node, next) => {
  next.connect(node.next)
  node.connect(next)
}

const drop = (node) => {
  node.prev.connect(node.next)
  return node
}

const count = (node, sum = 0) => !node ? sum : count(node.next, sum + 1)

const findFromLast = (node, value) => {
  return node == null || node.value === value ? node : findFromLast(node.prev, value)
}

class Node {
  constructor(value) {
    this.value = value
    this.prev = null
    this.next = null
  }

  connect(other) {
    this.next = other
    other.prev = this
  }
}

module.exports = class LinkedList {
  constructor() {
    this.start = new Node('-START-')
    this.end = new Node('-END-')
    this.start.connect(this.end)
  }

  get head() {
    return this.start.next
  }

  get last() {
    return this.end.prev
  }

  count() {
    return count(this.head) - 1  // Don't count `end`.
  }

  isEmpty() {
    return this.head === this.end
  }

  push(elm) {
    insertAfter(this.last, new Node(elm))
  }

  pop() {
    return this.dropNode(this.last)
  }

  unshift(elm) {
    insertAfter(this.start, new Node(elm))
  }

  shift() {
    return this.dropNode(this.head)
  }

  delete(elm) {
    const node = findFromLast(this.last, elm)
    return node ? this.dropNode(node) : null
  }

  dropNode(node) {
    if (this.isEmpty()) {
      return null
    }
    const dropped = drop(node)
    return dropped.value
  }
}
