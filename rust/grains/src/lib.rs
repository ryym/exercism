pub fn square(s: u32) -> u64 {
    assert!(1 <= s && s <= 64, "Square must be between 1 and 64");
    2u64.pow(s - 1)
}

pub fn total() -> u64 {
    // (1..65).map(|s| square(s)).sum()
    // (1..64).fold((1, 1), |(t, p), _| (t + p*2, p*2)).0
    let last = square(64);
    last + (last - 1)
}
