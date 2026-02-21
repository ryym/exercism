package encode

import (
	"strconv"
	"strings"
	"unicode"
)

func RunLengthEncode(s string) string {
	if len(s) == 0 {
		return ""
	}
	var b strings.Builder
	chars := append([]rune(s), '_')
	current := chars[0]
	seq := 1
	for _, c := range chars[1:] {
		if c == current {
			seq++
		} else {
			if seq > 1 {
				b.WriteString(strconv.Itoa(seq))
			}
			b.WriteRune(current)
			current = c
			seq = 1
		}
	}
	return b.String()
}

func RunLengthDecode(s string) string {
	var b strings.Builder
	chars := []rune(s)
	for i := 0; i < len(chars); i++ {
		end := i
		for unicode.IsDigit(chars[end]) {
			end++
		}
		if end == i {
			b.WriteRune(chars[i])
		} else {
			count, err := strconv.Atoi(string(chars[i:end]))
			if err != nil {
				panic(err)
			}
			letter := chars[end]
			i = end
			restored := strings.Repeat(string(letter), count)
			b.WriteString(restored)
		}
	}
	return b.String()
}
