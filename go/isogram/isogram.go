package isogram

import "strings"

func IsIsogram(s string) bool {
	seen := make(map[rune]bool, len(s))

	for _, c := range strings.ToLower(s) {
		if 'a' <= c && c <= 'z' {
			if seen[c] {
				return false
			}
			seen[c] = true
		}
	}

	return true
}
