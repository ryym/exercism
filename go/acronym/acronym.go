package acronym

import (
	"regexp"
	"strings"
)

func Abbreviate(s string) string {
	sep := regexp.MustCompile(`[,:]\s*|\s+|-`)
	acr := ""
	for _, w := range sep.Split(s, -1) {
		acr += string(w[0])
	}
	return strings.ToUpper(acr)
}
