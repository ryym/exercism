pub fn encode(s: &str) -> String {
    if s.len() == 0 {
        return String::from(s);
    }

    let mut chars = s.chars();
    let mut prev = chars.next().unwrap();
    let mut n = 1;
    let mut out = String::new();

    for ch in chars.chain("_".chars()) {
        if ch == prev {
            n += 1;
        } else {
            if n > 1 {
                out.push_str(&n.to_string());
            }
            out.push(prev);
            prev = ch;
            n = 1;
        }
    }

    out
}

pub fn decode(s: &str) -> String {
    let mut out = String::new();
    let mut n = 0;

    for ch in s.chars() {
        if let Some(d) = ch.to_digit(10) {
            n = n * 10 + d;
        } else {
            out.push(ch);
            (1..n).for_each(|_| out.push(ch));
            n = 0;
        }
    }

    out
}
