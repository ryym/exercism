use std::collections::HashSet;

pub fn check(s: &str) -> bool {
    let mut seen = HashSet::new();
    let allowed = vec!['-', ' '];

    s.to_string()
        .to_lowercase()
        .chars()
        .filter(|c| !allowed.contains(c))
        .all(|c| {
            if seen.contains(&c) {
                false
            } else {
                seen.insert(c);
                true
            }
        })
}
