mod args;

use clap::Parser;
use args::parse_cli;

fn main() {
    let x = parse_cli();
    eprintln!("x = {:#?}", x);
}
