package raindrops

import "strconv"

type Pair struct {
	Factor int
	Word   string
}

func Convert(n int) string {
	pairs := []Pair{
		Pair{3, "Pling"},
		Pair{5, "Plang"},
		Pair{7, "Plong"},
	}

	s := ""
	for _, p := range pairs {
		if n%p.Factor == 0 {
			s += p.Word
		}
	}

	if s == "" {
		return strconv.Itoa(n)
	}
	return s
}
