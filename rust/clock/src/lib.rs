use std::fmt::{Display, Formatter, Result};

#[derive(Eq, PartialEq, Debug)]
pub struct Clock {
    hours: i32,
    minutes: i32,
}

const DATE_MINUTES: i32 = 1440;

impl Clock {
    pub fn new(h: i32, m: i32) -> Self {
        let total_m = DATE_MINUTES + ((h * 60 + m) % DATE_MINUTES) % DATE_MINUTES;
        let hours = total_m / 60 % 24;
        let minutes = total_m % 60;
        Clock { hours, minutes }
    }

    pub fn add_minutes(&self, minutes: i32) -> Self {
        Self::new(self.hours, self.minutes + minutes)
    }
}

impl Display for Clock {
    fn fmt(&self, f: &mut Formatter) -> Result {
        write!(f, "{:02}:{:02}", self.hours, self.minutes)
    }
}
