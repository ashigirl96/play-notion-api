use clap::Parser;
use chrono::{Duration, ParseResult};
use dateparser::DateTimeUtc;
use chrono::prelude::*;
use big_s::S;

#[derive(Parser, Debug)]
#[clap(author, version, about, long_about = None)]
struct Args {
    #[clap(short, long)]
    project: String,

    #[clap(short, long)]
    date: String,

    #[clap(short, long)]
    content: String,
}

fn parse_date(date: &str) -> String {
    let date_only = DateTime::parse_from_rfc3339("2022-03-21T10:00:00+09:00");
    let hoge = DateTime::parse_from_rfc3339("nowT10:00:00+09:00");
    let now = Local::now().with_timezone(&FixedOffset::east(9 * 3600));
}

#[derive(Debug)]
pub struct Post {
    pub project_url: String,
    pub date: String,
    pub content: String,
}

pub fn parse_cli() -> Post {
    let args = Args::parse();

    let project_url = match args.project.as_ref() {
        "PRM" => S("https://www.notion.so/PRM-5f572b9c11004fd4bec701d0ac5628f5"),
        "BLOG" => S("https://www.notion.so/6b1fcb085f754030a3629342daf5929f"),
        _ => S("https://www.notion.so/PRM-5f572b9c11004fd4bec701d0ac5628f5"),
    };

    Post {
        project_url,
        date: S("2022-03-14"),
        content: S("ウンチーコングって知ってる？"),
    }
}