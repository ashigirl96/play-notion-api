use envy;
use serde_derive::Deserialize;
use std::collections::{HashMap};
use std::{process};
use maplit::hashmap;
use big_s::S;

#[derive(Debug, Deserialize)]
struct Config {
    notion_api_key: String,
}

#[derive(Deserialize, Debug)]
struct Page {
    id: String,
}

#[derive(Deserialize, Debug)]
struct GetDatabasesQueryResponse {
    results: Vec<Page>,
}

#[tokio::main]
async fn main() -> std::result::Result<(), Box<dyn std::error::Error>> {
    let config = match envy::from_env::<Config>() {
        Ok(val) => val,
        Err(err) => {
            println!("{}", err);
            process::exit(1);
        }
    };

    let database_id = String::from("b408b55abee0476b98f471106f5421e7");
    let request_url = format!("https://api.notion.com/v1/databases/{}/query", database_id);

    let client = reqwest::Client::builder().build()?;

    let request = client
        .post(request_url)
        .bearer_auth(&config.notion_api_key)
        .header("Notion-Version", "2022-02-22")
        .header("Content-Type", "application/json");

    let res = request
        .send()
        .await?;

    let t = res.text().await?;
    let response: GetDatabasesQueryResponse = serde_json::from_str(&t)?;
    eprintln!(" = {:?}", response.results);

    for result in response.results {
        let request_url = format!("https://api.notion.com/v1/pages/{}", result.id);
        let res = client
            .patch(request_url)
            .bearer_auth(&config.notion_api_key)
            .header("Notion-Version", "2022-02-22")
            .header("Content-Type", "application/json")
            .json(&hashmap! {
                S("archived") => true,
            })
            .send()
            .await?;
        println!("res = {}", &res.text().await?);
    }


    Ok(())
}
