pub fn reply(remark: &str) -> &'static str {
    let remark = remark.trim();

    if remark.is_empty() {
        "Fine. Be that way!"
    } else if remark.ends_with("?") {
        "Sure."
    } else if is_shout(remark) {
        "Whoa, chill out!"
    } else {
        "Whatever."
    }
}

fn is_shout(remark: &str) -> bool {
    remark
        .chars()
        .filter(|c| c.is_alphabetic())
        .all(|c| c.is_uppercase())
}
