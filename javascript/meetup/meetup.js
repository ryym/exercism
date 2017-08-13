const DAYS = Object.freeze({
  Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3,
  Thursday: 4, Friday: 5, Saturday: 6,
})

const findMeetup = (year, month, dayName, at) => {
  const day = DAYS[dayName]
  if (day == null) {
    throw new Error(`Invalid day: ${dayName}`)
  }

  const meetup = at === 'teenth'
    ? getDayTeenth(year, month, day)
    : getDayDate(year, month, day, at)

  if (meetup.getFullYear() !== year || meetup.getMonth() !== month) {
    throw new Error(`The specified date does not exist`)
  }
  return meetup
}

const getDayTeenth = (year, month, day) => {
  const firstTeenth = new Date(year, month, 13)
  return getNextDayFrom(firstTeenth, day)
}

const getDayDate = (year, month, day, at) => {
  const monthStart = new Date(year, month, 1)
  const firstDate = getNextDayFrom(monthStart, day)
  const nth = getDesiredNth(at, firstDate)
  return addDate(firstDate, 7 * (nth - 1))
}

const getNextDayFrom = (date, desiredDay) => {
  const diff = (7 - (date.getDay() - desiredDay)) % 7
  return addDate(date, diff)
}

const getDesiredNth = (at, firstDate) => {
  if (at !== 'last') {
    return parseInt(at, 10)
  }
  const monthLast = new Date(firstDate.getFullYear(), firstDate.getMonth() + 1, 0)
  return 1 + Math.floor((monthLast.getDate() - firstDate.getDate()) / 7)
}

const addDate = (date, n) => {
  const dayInMillis = n * 24 * 60 * 60 * 1000
  return new Date(date.getTime() + dayInMillis)
}

module.exports = findMeetup
