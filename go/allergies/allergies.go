package allergies

// var table = map[int]string{
// 	1: "eggs",
// }

var allergyNames = []string{
	"eggs",
	"peanuts",
	"shellfish",
	"strawberries",
	"tomatoes",
	"chocolate",
	"pollen",
	"cats",
}

func Allergies(allergies uint) []string {
	bits := toBits(allergies)
	names := make([]string, 0, len(bits))
	for i, bit := range bits {
		if bit {
			names = append(names, allergyNames[i])
		}
	}
	return names
}

func AllergicTo(allergies uint, allergen string) bool {
	bits := toBits(allergies)
	for i, bit := range bits {
		if bit && allergyNames[i] == allergen {
			return true
		}
	}
	return false
}

func toBits(n uint) []bool {
	maxBit := 8 // 128
	bits := make([]bool, 0, maxBit)
	for i := 0; n > 0 && i < maxBit; i++ {
		bit := n&1 == 1
		bits = append(bits, bit)
		n >>= 1
	}
	return bits
}
