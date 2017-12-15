struct Collatz(u64);

impl Iterator for Collatz {
    type Item = u64;

    fn next(&mut self) -> Option<Self::Item> {
        let n = self.0;
        if n == 1 {
            None
        } else {
            self.0 = if n % 2 == 0 { n / 2 } else { 3 * n + 1 };
            Some(self.0)
        }
    }
}

// return Ok(x) where x is the number of steps required to reach 1
pub fn collatz(n: u64) -> Result<u64, &'static str> {
    if n == 0 {
        Err("n must be greater than 0")
    } else {
        Ok(Collatz(n).count() as u64)
    }
}
