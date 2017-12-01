package bob

import (
	"regexp"
	"strings"
)

func Hey(remark string) string {
	s := strings.TrimSpace(remark)

	if s == "" {
		return "Fine. Be that way!"
	}

	uppers := regexp.MustCompile(`[A-Z]`)
	if uppers.MatchString(s) && strings.ToUpper(s) == s {
		return "Whoa, chill out!"
	}

	if strings.HasSuffix(s, "?") {
		return "Sure."
	}
	return "Whatever."
}
