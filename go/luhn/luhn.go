package luhn

import (
	"unicode"
)

func Valid(input string) bool {
	ns := make([]int, 0, len(input))

	for _, c := range input {
		switch {
		case unicode.IsSpace(c):
			continue
		case unicode.IsDigit(c):
			// http://exercism.io/submissions/07d6e22408654bb8ac206e3749b9769a
			ns = append(ns, int(c-'0'))
		default:
			return false
		}
	}

	if len(ns) < 2 {
		return false
	}

	total := 0
	last := len(ns) - 1
	for i, n := range ns {
		if (last-i)%2 == 0 {
			total += n
		} else {
			d := n * 2
			if d > 9 {
				total += d - 9
			} else {
				total += d
			}
		}
	}

	return total%10 == 0
}
