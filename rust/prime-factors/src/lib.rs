pub fn factors(mut n: usize) -> Vec<usize> {
    let mut factors = vec![];
    let mut div = 2;

    while n > 1 {
        if n % div == 0 {
            factors.push(div);
            n = n / div;
        } else {
            div += 1;
        }
    }

    factors
}
