use chrono::prelude::*;

#[derive(Queryable, Deserialize, Serialize)]
pub struct User {
    pub id: i32,
    pub email: String
}

#[derive(Queryable, Deserialize, Serialize)]
pub struct Project {
    pub id: i32,
    pub date_created: DateTime<Utc>,
    pub date_modified: DateTime<Utc>,
    pub date_completed: Option<DateTime<Utc> >,
    pub name: String,
}

#[derive(Queryable, Deserialize, Serialize)]
pub struct Task {
    pub id: i32,
    pub project_id: i32,
    pub date_created: DateTime<Utc>,
    pub date_modified: DateTime<Utc>,
    pub date_completed: Option<DateTime<Utc> >,
    pub name: String,
}

#[derive(Queryable, Deserialize, Serialize)]
pub struct Tag {
    pub id: i32,
    pub date_created: DateTime<Utc>,
    pub date_modified: DateTime<Utc>,
    pub name: String,
}

#[derive(Queryable, Deserialize, Serialize)]
pub struct TaskTag {
    pub id: i32,
    pub tag_id: i32,
    pub task_id: i32,
}

#[derive(Queryable, Deserialize, Serialize)]
pub struct ProjectTag {
    pub id: i32,
    pub tag_id: i32,
    pub project_id: i32,
}

#[derive(Queryable, Deserialize, Serialize)]
pub struct TaskTime {
    pub id: i32,
    pub user_id: i32,
    pub task_id: i32,
    pub start_time: DateTime<Utc>,
    pub end_time: Option<DateTime<Utc>>,
}
