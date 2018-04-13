pub fn is_armstrong_number(num: u32) -> bool {
    let mut ns = Vec::new();
    let mut n = num;
    while n != 0 {
        ns.push(n % 10);
        n = n / 10;
    }

    let len = ns.len() as u32;
    ns.into_iter().fold(0, |t, n| t + n.pow(len)) == num
}
