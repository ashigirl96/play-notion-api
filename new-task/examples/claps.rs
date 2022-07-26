use clap::Parser;

#[derive(Parser, Debug)]
#[clap(author, version, about, long_about = None)]
struct Args {
    #[clap(short, long)]
    name: String,

    #[clap(short, long, default_value_t = 1)]
    count: u8,
}

fn main() {
    //  cargo run --example claps -- --name hoge -c 3
    let args = Args::parse();

    for _ in 0..args.count {
        eprintln!("args.name = {:#?}", args.name);
    }
}