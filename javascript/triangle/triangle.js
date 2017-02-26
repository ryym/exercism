const isValidSides = (x, y, z) => {
  const allPositive = [x, y, z].every(a => a > 0)
  return allPositive && x + y >= z && y + z >= x
}

const determineKind = (x, y, z) => {
  if (!isValidSides(x, y, z)) {
    return null  // Not a triangle
  }
  const eqs = [x == y, y == z, z == x].filter(eq => eq)
  switch (eqs.length) {
    case 3:
    case 2: return 'equilateral'
    case 1: return 'isosceles'
    default: return 'scalene'
  }
}

module.exports = class Triangle {
  constructor(x, y, z) {
    this.x = x
    this.y = y
    this.z = z
  }

  kind() {
    const kind = determineKind(this.x, this.y, this.z)
    if (kind === null) {
      throw new Error(`Invalid side lengths: [${this.x} ${this.y} ${this.z}]`)
    }
    return kind
  }
}
