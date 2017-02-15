const SECONDS_OF_YEAR = 31557600

const RATIOS = Object.freeze({
  earth: 1,
  mercury: 0.2408467,
  venus: 0.61519726,
  mars: 1.8808158,
  jupiter: 11.862615,
  saturn: 29.447498,
  uranus: 84.016846,
  neptune: 164.79132,
})

const makeAgeOn = seconds => planet => {
  if (! RATIOS.hasOwnProperty(planet)) {
    throw new Error(`The planet ${planet} does not exist`)
  }
  const age = seconds / (SECONDS_OF_YEAR * RATIOS[planet])
  return Math.round(age * 100) / 100
}

module.exports = class SpaceAge {
  constructor(seconds) {
    this.seconds = seconds
    this.getAgeOn = makeAgeOn(seconds)
  }

  onEarth() {
    return this.getAgeOn('earth')
  }

  onMercury() {
    return this.getAgeOn('mercury')
  }

  onVenus() {
    return this.getAgeOn('venus')
  }

  onMars() {
    return this.getAgeOn('mars')
  }

  onJupiter() {
    return this.getAgeOn('jupiter')
  }

  onSaturn() {
    return this.getAgeOn('saturn')
  }

  onUranus() {
    return this.getAgeOn('uranus')
  }

  onNeptune() {
    return this.getAgeOn('neptune')
  }
}
