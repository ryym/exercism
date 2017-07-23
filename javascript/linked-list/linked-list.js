const insert = (prev, node, next) => {
  prev.connect(node)
  node.connect(next)
}

const drop = (node) => {
  node.prev.connect(node.next)
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
    insert(this.last, new Node(elm), this.end)
  }

  pop() {
    if (this.isEmpty()) {
      return null
    }
    const { last } = this
    drop(last)
    return last.value
  }

  unshift(elm) {
    insert(this.start, new Node(elm), this.head)
  }

  shift() {
    if (this.isEmpty()) {
      return null
    }
    const { head } = this
    drop(head)
    return head.value
  }

  delete(elm) {
    const node = findFromLast(this.last, elm)
    if (node) {
      drop(node)
      return node.value
    }
    return null
  }
}
