package hamming

import "errors"

func Distance(a, b string) (int, error) {
	if len(a) != len(b) {
		return -1, errors.New("Strand lengths must be same")
	}

	d := 0

	// Strands contain only alphabets so we can use
	// byte length safely to iterate characters.
	for i := 0; i < len(a); i++ {
		if a[i] != b[i] {
			d += 1
		}
	}
	return d, nil
}
