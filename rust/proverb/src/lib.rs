pub fn build_proverb(words: Vec<&str>) -> String {
    if words.len() == 0 {
        return String::new()
    }
    (1..words.len())
        .map(|i| build_sentence(words[i - 1], words[i]) + "\n")
        .collect::<String>()
        + &last_sentence(words[0])
}

fn build_sentence(want: &str, lost: &str) -> String {
    format!("For want of a {} the {} was lost.", want, lost)
}

fn last_sentence(cause: &str) -> String {
    format!("And all for the want of a {}.", cause)
}
