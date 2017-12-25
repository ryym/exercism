use std::collections::HashSet;

pub fn check(s: &str) -> bool {
    let mut seen = HashSet::new();
    s.to_string()
        .to_lowercase()
        .chars()
        .filter(|c| c.is_alphabetic())
        .all(|c| seen.insert(c))
}
