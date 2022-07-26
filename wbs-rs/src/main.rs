#![feature(drain_filter)]
// mod github;

use big_s::S;
use envy;
// use github::GetPullsResponse;
use futures::{executor::block_on, future::join_all};
use maplit::hashmap;
use reqwest::Response;
use serde_derive::Deserialize;
use std::collections::{HashMap, HashSet};
use std::io::Seek;
use std::iter::Rev;
use std::process;

#[derive(Deserialize, Debug, Clone)]
struct User {
    pub login: String,
    pub id: i32,
}

#[derive(Deserialize, Debug, Clone)]
struct Milestone {
    pub url: String,
    pub html_url: String,
    pub id: u32,
    pub number: u32,
    pub due_on: String, // 2022-03-15T07:00:00Z
}

#[derive(Deserialize, Debug, Clone)]
struct Pull {
    pub draft: bool,
    pub number: u32,
    pub html_url: String,
    pub title: String,
    pub state: String,
    pub user: User,
    pub assignee: Option<User>,
    pub assignees: Vec<User>,
    pub requested_reviewers: Vec<User>,
    pub milestone: Option<Milestone>,
}

#[derive(Deserialize, Debug, Clone)]
struct Review {
    user: User,
    state: String,
}

#[derive(Deserialize, Debug)]
pub struct GetPullsResponse(Vec<Pull>);

#[derive(Deserialize, Debug)]
pub struct GetPullsReviewsResponse(Vec<Review>);

#[derive(Debug, Deserialize)]
struct Config {
    notion_api_key: String,
    github_token: String,
}

#[derive(Deserialize, Debug)]
struct Page {
    id: String,
}

#[derive(Deserialize, Debug)]
struct GetDatabasesQueryResponse {
    results: Vec<Page>,
}

#[derive(Debug)]
struct PullExample {
    number: u32,
    url: String,
    title: String,
    is_reviewed: bool,
    milestone: String,
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

    let _pulls = client
        .get("https://api.github.com/repos/medley-inc/medley-clinic/pulls")
        .header("User-Agent", "curl/7.64.1")
        .header("Authorization", format!("token {}", config.github_token))
        .send()
        .await?;
    let pulls_ = _pulls.text().await?;
    let pulls: GetPullsResponse = serde_json::from_str(&pulls_)?;
    let mut pulls = pulls.0;

    pulls.retain(|x| {
        if x.assignee.as_ref().is_none() {
            return false;
        }
        let assignee = x.assignee.as_ref().unwrap();
        x.draft == false && x.milestone.is_some() && assignee.login == "ashigirl96"
    });

    let results: Vec<_> = pulls
        .iter_mut()
        .map(|pull| async move {
            let reviews_response = client
                .get(format!(
                    "https://api.github.com/repos/medley-inc/medley-clinic/pulls/{}/reviews",
                    pull.number
                ))
                .header("User-Agent", "curl/7.64.1")
                .header(
                    "Authorization",
                    format!("token {}", "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"),
                )
                .send()
                .await;
            eprintln!(" reviews_response = {:#?}", reviews_response);

            return PullExample {
                number: 0,
                url: "".to_string(),
                title: "".to_string(),
                is_reviewed: false,
                milestone: "".to_string(),
            };
        })
        .collect();

    block_on(async {
        let results = join_all(results).await;
    });

    // let results = pulls
    //     .iter()
    //     .map(|pull| {
    //         let reviews_response = client
    //             .get(format!(
    //                 "https://api.github.com/repos/medley-inc/medley-clinic/pulls/{}/reviews",
    //                 pull.number
    //             ))
    //             .header("User-Agent", "curl/7.64.1")
    //             .header("Authorization", format!("token {}", config.github_token))
    //             .send()
    //             .await?
    //             .text()
    //             .await?;
    //         let reviews: GetPullsReviewsResponse = serde_json::from_str(&reviews_response)?;
    //         let reviews = reviews.0;
    //         let reviews_: HashSet<String> =
    //             reviews.iter().map(|r| r.user.login.to_owned()).collect();
    //         let committer = pull.to_owned().user.login;
    //
    //         let mut requested_reviewers: HashSet<String> = pull
    //             .requested_reviewers
    //             .iter()
    //             .map(|r| r.login.to_owned())
    //             .collect();
    //
    //         let approved_reviewers: HashSet<String> = reviews
    //             .iter()
    //             .filter(|r| r.state == "APPROVED")
    //             .map(|r| r.user.login.to_owned())
    //             .collect();
    //
    //         requested_reviewers.extend(approved_reviewers);
    //         requested_reviewers.extend([committer]);
    //
    //         eprintln!("requested_reviewers = {:#?}", requested_reviewers);
    //         eprintln!("reviews_ = {:#?}", reviews_);
    //
    //         let reviews_: HashSet<_> = reviews_.difference(&requested_reviewers).collect();
    //         eprintln!("reviews_ = {:#?}", reviews_);
    //
    //         PullExample {
    //             number: pull.number,
    //             title: pull.title.to_owned(),
    //             url: pull.html_url.to_owned(),
    //             is_reviewed: !reviews_.is_empty(),
    //             milestone: pull.milestone.unwrap().due_on,
    //         }
    //     })
    //     .collect::<Vec<PullExample>>()
    //     .await;

    // for pull in pulls {

    // }

    // for pull in pulls.0 {
    //     let Pull { draft, number, .. } = pull;
    //     eprintln!("pull = {:?}", draft);
    // }

    //
    // let request = client
    //     .post(request_url)
    //     .bearer_auth(&config.notion_api_key)
    //     .header("Notion-Version", "2022-02-22")
    //     .header("Content-Type", "application/json");
    //
    // let res = request
    //     .send()
    //     .await?;
    //
    // let t = res.text().await?;
    // let response: GetDatabasesQueryResponse = serde_json::from_str(&t)?;
    // eprintln!(" = {:?}", response.results);
    //
    // for result in response.results {
    //     let request_url = format!("https://api.notion.com/v1/pages/{}", result.id);
    //     let res = client
    //         .patch(request_url)
    //         .bearer_auth(&config.notion_api_key)
    //         .header("Notion-Version", "2022-02-22")
    //         .header("Content-Type", "application/json")
    //         .json(&hashmap! {
    //             S("archived") => true,
    //         })
    //         .send()
    //         .await?;
    //     println!("res = {}", &res.text().await?);
    // }

    Ok(())
}
