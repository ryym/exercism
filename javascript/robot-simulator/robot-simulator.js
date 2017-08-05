const NORTH = 'north'
const EAST = 'east'
const SOUTH = 'south'
const WEST = 'west'
const DIRECTIONS = Object.freeze(
  [NORTH, EAST, SOUTH, WEST]
)

const COMMANDS = Object.freeze({
  R: 'turnRight',
  L: 'turnLeft',
  A: 'advance',
})

module.exports = class Robot {
  constructor() {
    this.bearing = NORTH
    this.coordinates = [0, 0]
  }

  orient(direction) {
    if (DIRECTIONS.indexOf(direction) === -1) {
      throw new Error('Invalid Robot Bearing')
    }
    this.bearing = direction
    return this
  }

  at(x, y) {
    this.coordinates = [x, y]
    return this
  }

  place({ x, y, direction }) {
    this.at(x, y).orient(direction)
  }

  turnRight() {
    this.bearing = this._turnFrom(this.bearing, 1)
    return this
  }

  turnLeft() {
    this.bearing = this._turnFrom(this.bearing, -1)
    return this
  }

  _turnFrom(direction, step) {
    const current = DIRECTIONS.indexOf(direction)
    const len = DIRECTIONS.length
    const next = (current + (step + len) % len) % len
    return DIRECTIONS[next]
  }

  advance() {
    this.coordinates = this._advance(this.bearing, this.coordinates)
    return this
  }

  _advance(bearing, [x, y]) {
    switch (bearing) {
      case NORTH: return [x, y + 1]
      case EAST:  return [x + 1, y]
      case SOUTH: return [x, y - 1]
      case WEST:  return [x - 1, y]
    }
  }

  instructions(commands) {
    return commands.split('').map(c => COMMANDS[c]).filter(inst => inst)
  }

  evaluate(commands) {
    this.instructions(commands).forEach(inst => this[inst]())
  }
}
