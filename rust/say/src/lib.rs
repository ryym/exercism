const UNDER20: [&str; 20] = [
    "zero", "one", "two", "three", "four",
    "five", "six", "seven", "eight", "nine",
    "ten", "eleven", "twelve", "thirteen", "fourteen",
    "fifteen", "sixteen", "seventeen", "eighteen", "nineteen",
];

const TENS: [&str; 10] = [
    "", "", "twenty", "thirty", "forty", "fifty",
    "sixty", "seventy", "eighty", "ninety",
];

const UNITS: [&str; 6] = [
    "thousand", "million", "billion",
    "trillion", "quadrillion", "quintillion",
];

pub fn encode(n: u64) -> String {
    if n == 0 {
        return String::from(UNDER20[0]);
    }

    let mut chunks = Vec::new();
    let mut n = n;
    while n > 0 {
        chunks.push(n % 1000);
        n = n / 1000;
    }

    let mut parts = chunks.iter()
        .skip(1)
        .zip(&UNITS)
        .filter(|&(&c, _)| c > 0)
        .map(|(&c, &u)| format!("{} {}", encode_hundreds(c), u))
        .rev()
        .collect::<Vec<_>>();

    if chunks[0] > 0 {
        parts.push(encode_hundreds(chunks[0]));
    }

    parts.join(" ")
}

fn encode_hundreds(m: u64) -> String {
    let mut s = Vec::new();
    let h = m / 100;
    if h > 0 {
        s.push(encode_tens(h as usize));
        s.push(String::from("hundred"));
    }

    let t = m % 100;
    if t > 0 {
        s.push(encode_tens(t as usize));
    }

    return s.join(" ");
}

fn encode_tens(n: usize) -> String {
    if n < 20 {
        String::from(UNDER20[n])
    } else if n % 10 == 0 {
        String::from(TENS[n / 10])
    } else {
        format!("{}-{}", TENS[n / 10], UNDER20[n % 10])
    }
}
