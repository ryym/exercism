package grains

import (
	"errors"
	"math"
)

const max = 64

func Square(n int) (uint64, error) {
	if n <= 0 || max < n {
		return 0, errors.New("invalid input")
	}
	return uint64(math.Pow(2, float64(n-1))), nil
}

func Total() uint64 {
	/* not scalable but so fast. */
	return ^uint64(0)

	/*
	 * It seems simple loop is slightly faster than math.Pow.
	 */
	// var last uint64 = 1
	// var total uint64 = last
	// for i := 2; i <= max; i++ {
	// 	last = last * 2
	// 	total += last
	// }
	// return total

	/*
	 * total: (2^n - 1) -> (2^64 - 1)
	 * But uint64 cannot store 2^64.
	 */
	// prevPow := uint64(math.Pow(2, max-1))
	// return prevPow - 1 + prevPow

}
