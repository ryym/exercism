package reverse

func String(s string) string {
	in := []rune(s)
	out := make([]rune, len(in))
	for i := 0; i < len(in); i++ {
		out[i] = in[len(in)-1-i]
	}
	return string(out)
}
