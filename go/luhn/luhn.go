package luhn

import (
	"regexp"
	"strconv"
)

var ignores *regexp.Regexp = regexp.MustCompile(`\s+`)

func Valid(input string) bool {
	s := ignores.ReplaceAllString(input, "")

	ns := make([]int, 0, len(s))
	for _, c := range s {
		if n, err := strconv.Atoi(string(c)); err == nil {
			ns = append(ns, n)
		} else {
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
