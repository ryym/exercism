package gigasecond

import (
	"math"
	"time"
)

const testVersion = 4

var gigaSecond float64 = math.Pow(10, 9)

func AddGigasecond(t time.Time) time.Time {
	d := time.Duration(gigaSecond) * time.Second
	return t.Add(d)
}
