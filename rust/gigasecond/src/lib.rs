extern crate chrono;

use chrono::{DateTime, UTC, Duration};

pub fn after(d: DateTime<UTC>) -> DateTime<UTC> {
    let gigasecond = 10i64.pow(9);
    d + Duration::seconds(gigasecond)
}
