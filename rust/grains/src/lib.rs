pub fn square(s: u32) -> u64 {
    assert!(1 <= s && s <= 64, "Square must be between 1 and 64");
    // 2f64.powi((s - 1) as i32) as u64
    (1..s).fold(1, |t, _| t*2)
}

pub fn total() -> u64 {
    // (1..65).map(|s| square(s)).sum()
    // (1..64).fold((1, 1), |(t, p), _| (t + p*2, p*2)).0
    let last = square(64);
    last + (last - 1)
}
