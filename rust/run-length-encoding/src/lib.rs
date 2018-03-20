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
    let mut ns = Vec::with_capacity(3);

    for ch in s.chars() {
        if ch.is_digit(10) {
            ns.push(ch.to_string());
        } else {
            let n = if ns.is_empty() {
                1
            } else {
                ns.join("").parse().unwrap()
            };
            for _ in 0..n {
                out.push(ch);
            }
            ns = Vec::with_capacity(3);
        }
    }

    out
}
