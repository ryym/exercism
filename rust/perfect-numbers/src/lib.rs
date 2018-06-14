#[derive(Debug, PartialEq, Eq)]
pub enum Classification {
    Abundant,
    Perfect,
    Deficient,
}

pub fn classify(num: u64) -> Option<Classification> {
    match num {
        0 => None,
        1 => Some(Classification::Deficient),
        _ => {
            let end = (num as f64).sqrt() as u64;
            let total = (2..=end)
                .filter(|&d| num % d == 0 && d != num / d)
                .fold(1, |total, d| total + d + num / d);

            let class = if total == num {
                Classification::Perfect
            } else if total < num {
                Classification::Deficient
            } else {
                Classification::Abundant
            };
            Some(class)
        }
    }
}
