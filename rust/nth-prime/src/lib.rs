pub fn nth(at: usize) -> Result<usize, &'static str> {
    match at {
        0 => Err("Invalid nth value"),
        1 => Ok(2),
        _ => {
            let mut i = 1;
            let mut n = 1;
            while i < at {
                n += 2;
                if is_prime(n) {
                    i += 1;
                }
            }
            Ok(n)
        }
    }
}

fn is_prime(n: usize) -> bool {
    let end = (n as f64).sqrt() as usize;

    // (3..(end + 1)).step_by(2).all(|x| n % x != 0)
    let mut i = 3;
    while i <= end {
        if n % i == 0 {
            return false
        }
        i += 2;
    }
    true
}
