// No `Vec::windows` version.
pub fn series(digits: &str, len: usize) -> Vec<String> {
    let end = if digits.len() < len { 0 } else { digits.len() - len + 1 };
    (0..end).map(|n| digits[n..n+len].to_string()).collect()
}
