package isogram

import "strings"

func IsIsogram(s string) bool {
	cs := make(map[rune]struct{}, len(s))

	for _, c := range strings.ToLower(s) {
		if _, exist := cs[c]; exist {
			return false
		}
		if 'a' <= c && c <= 'z' {
			cs[c] = struct{}{}
		}
	}

	return true
}
