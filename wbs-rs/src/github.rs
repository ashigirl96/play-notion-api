// use serde_derive::Deserialize;
//
// #[derive(Deserialize, Debug)]
// struct User {
//     pub login: String,
//     pub id: i32,
// }
//
// #[derive(Deserialize, Debug)]
// struct Milestone {
//     pub url: String,
//     pub html_url: String,
//     pub id: u32,
//     pub number: u32,
//     pub due_on: String, // 2022-03-15T07:00:00Z
// }
//
// #[derive(Deserialize, Debug)]
// struct Pull {
//     pub draft: bool,
//     pub title: String,
//     pub state: String,
//     pub user: User,
//     pub assignee: Option<User>,
//     pub assignees: Vec<User>,
//     pub requested_reviewers: Vec<User>,
//     pub milestone: Option<Milestone>,
// }
//
// #[derive(Deserialize, Debug)]
// pub struct GetPullsResponse(Vec<Pull>);
