pub fn raindrops(n: i32) -> String {
    let cases = [
        (3, "Pling"),
        (5, "Plang"),
        (7, "Plong"),
    ];

    let mut s = String::new();
    for &(fact, sound) in cases.iter() {
        if n % fact == 0 {
            s += sound
        }
    }

    if s.is_empty() {
        n.to_string()
    } else {
        s
    }
}
