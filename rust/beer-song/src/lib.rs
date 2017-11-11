pub fn verse(n: i32) -> String {
    match n {
        _ if n < 0 => panic!("You are drunk!"),
        0 => String::from(
            "No more bottles of beer on the wall, no more bottles of beer.\n\
            Go to the store and buy some more, 99 bottles of beer on the wall.\n",
        ),
        _ => {
            let cur = bottles(n);
            let next = bottles(n - 1);
            let taken = if n == 1 { "it" } else { "one" };
            format!(
                "{cur} of beer on the wall, {cur} of beer.\n\
                Take {taken} down and pass it around, {next} of beer on the wall.\n",
                cur=cur, next=next, taken=taken
            )
        }
    }
}

fn bottles(n: i32) -> String {
    match n {
        0 => String::from("no more bottles"),
        1 => String::from("1 bottle"),
        _ => format!("{} bottles", n)
    }
}

pub fn sing(start: i32, end: i32) -> String {
    let mut vs = Vec::new();
    for n in (end..(start + 1)).rev() {
        vs.push(verse(n));
    }
    vs.join("\n")
}
