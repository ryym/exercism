package clock

import (
	"fmt"
)

const testVersion = 4

const MinutesOfDay = 1440

type Clock struct {
	hour   int
	minute int
}

func NewWithMinutes(minutes int) Clock {
	mm := minutes % MinutesOfDay
	if mm < 0 {
		mm = mm + MinutesOfDay
	}
	return Clock{
		hour:   mm / 60,
		minute: mm % 60,
	}
}

func New(h, m int) Clock {
	return NewWithMinutes(h*60 + m)
}

func (c Clock) String() string {
	return fmt.Sprintf("%02d:%02d", c.hour, c.minute)
}

func (c Clock) Add(minutes int) Clock {
	return NewWithMinutes(c.hour*60 + c.minute + minutes)
}
