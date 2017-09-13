#![feature(plugin)]
#![feature(plugin, custom_derive, custom_attribute)]
#![plugin(rocket_codegen)]
#![recursion_limit="128"]

#[macro_use]
extern crate lazy_static;
extern crate rocket;
extern crate rocket_contrib;
extern crate diesel;
extern crate obsess;

#[macro_use]
extern crate serde_derive;
extern crate serde_json;
extern crate r2d2;
extern crate r2d2_diesel;

// Server Imports
// Used to Setup DB Pool
use rocket::request::{Outcome, FromRequest};
use rocket::Outcome::{Success, Failure};
use rocket::http::Status;

// Used for Routes
use rocket::Request;
use rocket::response::NamedFile;
use rocket_contrib::Json;

// Std Imports
use std::path::{Path, PathBuf};
use std::collections::HashMap;

// DB Imports
use diesel::prelude::*;
use diesel::update;
use diesel::pg::PgConnection;
use r2d2::{Pool, PooledConnection, GetTimeout};
use r2d2_diesel::ConnectionManager;

// My imports
use obsess::*;
use obsess::models::*;


// DB Items
lazy_static! {
    pub static ref DB_POOL: Pool<ConnectionManager<PgConnection>> = create_db_pool();
}

pub struct DB(PooledConnection<ConnectionManager<PgConnection>>);

impl DB {
    pub fn conn(&self) -> &PgConnection {
        &*self.0
    }
}

impl<'a, 'r> FromRequest<'a, 'r> for DB {
    type Error = GetTimeout;
    fn from_request(_: &'a Request<'r>) -> Outcome<Self, Self::Error> {
        match DB_POOL.get() {
            Ok(conn) => Success(DB(conn)),
            Err(e) => Failure((Status::InternalServerError, e)),
        }
    }
}

// Routes
#[get("/dist/<file..>")]
fn dist_files(file: PathBuf) -> Option<NamedFile>{
     NamedFile::open(Path::new("../client/dist").join(file)).ok()
}


#[get("/")]
fn index() -> Option<NamedFile> {
    NamedFile::open("../client/dist/index.html").ok()
}

#[get("/project")]
fn project(db: DB) -> Option<Json<Project>> {
    use obsess::schema::user::dsl::*;
    use obsess::schema::project::dsl::*;
    project.first::<Project>(db.conn())
        .and_then(|result| {
            Ok(Json(result))
        }).ok()
}


fn main() {
        rocket::ignite()
            .mount("/", routes![index, project, dist_files])
            .launch();
}
