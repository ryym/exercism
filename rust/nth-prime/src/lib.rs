pub fn nth(at: i32) -> Result<i32, ()> {
    if at <= 0 {
        return Err(())
    }
    if at == 1 {
        return Ok(2)
    }

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

fn is_prime(n: i32) -> bool {
    let end = (n as f64).sqrt() as i32;

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
