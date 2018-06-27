pub fn twofer(name: &str) -> String {
    format!(
        "One for {}, one for me.",
        if name == "" { "you" } else { name }
    )
}
