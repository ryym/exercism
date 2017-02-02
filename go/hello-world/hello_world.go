package greeting

const testVersion = 3

func HelloWorld(word string) string {
	if (word == "") {
		word = "World"
	}
	return "Hello, " + word + "!"
}
