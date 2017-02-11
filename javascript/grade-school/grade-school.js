module.exports = class School {
  constructor() {
    this._roster = {}
  }

  roster() {
    return Object.keys(this._roster).reduce((roster, grade) => {
      roster[grade] = this._roster[grade].map(s => s)
      return roster
    }, {})
  }

  add(student, grade) {
    const { _roster } = this
    const students = _roster[grade] ? _roster[grade] : []
    _roster[grade] = students.concat(student).sort()
  }

  grade(grade) {
    return this._roster[grade] || []
  }
}
