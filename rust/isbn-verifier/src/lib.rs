/// Determines whether the supplied string is a valid ISBN number
pub fn is_valid_isbn(isbn: &str) -> bool {
    let mut sum = 0;
    let mut i = 10;

    for c in isbn.chars().filter(|&c| c != '-') {
        if i < 1 {
            return false;
        }
        let n = match c.to_digit(10) {
            Some(n) => n,
            _ if i == 1 && c == 'X' => 10,
            _ => return false,
        };
        sum += n * i;
        i -= 1;
    }

    i == 0 && sum % 11 == 0
}
