class Element {
  constructor(value, next) {
    if (arguments.length === 0) {
      throw new Error('Please specify value')
    }
    if (next && !(next instanceof Element)) {
      throw new Error('next must be an instance of Element')
    }
    this.value = value
    this.next = next
  }
}

class List {
  constructor(head) {
    this.head = head
  }

  push(el) {
    if (!this.head) {
      this.head = el
      return
    }
    let last = this.head
    while(last.next) {
      last = last.next
    }
    last.next = el
  }

  unshift(el) {
    if (!this.head) {
      this.head = el
      return
    }
    el.next = this.head
    this.head = el
  }

  shift() {
    if (!this.head) {
      return
    }
    this.head = this.head.next
  }

  pop() {
    if (!this.head) {
      return
    }
    if (!this.head.next) {
      this.head = undefined
      return
    }
    let prevLast = this.head
    while (prevLast.next.next) {
      prevLast = prevLast.next
    }
    prevLast.next = undefined
  }

  toArray() {
    const xs = []
    let el = this.head
    while (el) {
      xs.push(el.value)
      el = el.next
    }
    return xs
  }

  reverse() {
    let el = this.head
    let le
    while (el) {
      le = new Element(el.value, le)
      el = el.next
    }
    this.head = le
  }
}

List.fromArray = (xs) => {
  const head = xs.reverse().reduce(
    (next, value) => new Element(value, next),
    undefined
  )
  return new List(head)
}

module.exports = { Element, List }
