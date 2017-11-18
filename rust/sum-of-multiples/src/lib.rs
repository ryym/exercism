#![feature(iterator_step_by)]

use std::collections::HashSet;

pub fn sum_of_multiples(limit: u32, factors: &[u32]) -> u32 {
    let mut set = HashSet::new();
    for &n in factors {
        for m in (n..limit).step_by(n as usize) {
            set.insert(m);
        }
    }
    set.iter().sum()
}
