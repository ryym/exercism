const SUM: u32 = 1000;

pub fn find() -> Option<u32> {
    let a_ceil = (SUM as f64 / 3f64).floor() as u32;
    for a in 1..a_ceil {
        let mut b = a;
        let mut c = SUM - a - b;
        while c > b {
            if a*a + b*b == c*c {
                return Some(a * b * c);
            }
            b += 1;
            c -= 1;
        }
    }
    None
}
