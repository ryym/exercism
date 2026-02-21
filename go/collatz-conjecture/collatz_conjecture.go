package collatzconjecture

import "errors"

func CollatzConjecture(n int) (int, error) {
	if n <= 0 {
		return 0, errors.New("input must be positive")
	}

	steps := 0
	for ; n > 1; steps++ {
		if n%2 == 0 {
			n = n / 2
		} else {
			n = n*3 + 1
		}
		if steps > 100000 {
			panic("inifinite loop")
		}
	}

	return steps, nil
}
