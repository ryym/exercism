// ref: http://exercism.io/submissions/dfc38795d3994b34be862e1bff873ee0

// Iterator::step_by is currently unstable..!
struct StepBy2(usize);

impl Iterator for StepBy2 {
    type Item = usize;
    fn next (&mut self) -> Option<Self::Item> {
        self.0 += 2;
        Some(self.0)
    }
}

pub fn nth(at: usize) -> Result<usize, &'static str> {
    match at {
        0 => Err("nth must be greater than 0"),
        1 => Ok(2),
        _ => {
            let prime = odds().filter(|&x| is_prime(x)).nth(at - 2);
            Ok(prime.unwrap())
        }
    }
}

fn odds() -> StepBy2 {
    StepBy2(1)
}

fn is_prime(n: usize) -> bool {
    let end = (n as f64).sqrt() as usize;
    odds().take_while(|&x| x <= end).all(|x| n % x != 0)
}
