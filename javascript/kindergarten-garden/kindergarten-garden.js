const DEFAULT_STUDENTS = [
  'Alice', 'Bob', 'Charlie', 'David',
  'Eve', 'Fred', 'Ginny', 'Harriet',
  'Ileana', 'Joseph', 'Kincaid',  'Larry',
]

module.exports = class Garden {
  constructor(diagram, students = DEFAULT_STUDENTS, nCols = 2) {
    const plantsPerStudent = this.distributePlants(diagram, students, nCols)
    Object.assign(this, plantsPerStudent)
  }

  distributePlants(diagram, students, nCols = 2) {
    const garden = diagram.split('\n').map(r => r.split(''))
    const nSections = garden.length ? garden[0].length / nCols : 0
    return students.sort().slice(0, nSections).reduce((plants, st, i) => {
      const cups = this.getCupsAt(i * nCols, garden, nCols)
      plants[st.toLowerCase()] = cups.map(this.toPlant)
      return plants
    }, {})
  }

  getCupsAt(lefttop, garden, nCols) {
    return garden.reduce(
      (cs, row) => cs.concat(row.slice(lefttop, lefttop + nCols)),
      []
    )
  }

  toPlant(plantType) {
    switch (plantType) {
      case 'G': return 'grass'
      case 'C': return 'clover'
      case 'R': return 'radishes'
      case 'V': return 'violets'
    }
    return null
  }
}
