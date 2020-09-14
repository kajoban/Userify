var sqlite3 = require("sqlite3").verbose(); //verbose for extra debug info
var md5 = require("md5");

//def of SQLite database file
const DBSOURCE = "db.sqlite";

//init of SQLite db
let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.log("Error encountered: " + err);
    throw err;
  } else {
    console.log("Connected to SQLite Database");
    db.run(
      `CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text,
            email text UNIQUE,
            password text,
            CONSTRAINT email_unique UNIQUE (email)
        )`,
      (err) => {
        if (err) {
          console.log("Table already exists.");
        } else {
          console.log("Creating new table.");
          //New table create, add some default data
          var insert = "INSERT INTO user (name,email,password) VALUES (?,?,?)";
          db.run(insert, ["admin", "admin@userify.ca", md5("admin1245")]);
          db.run(insert, ["user", "user@userify.ca", md5("user12345")]);
        }
      }
    );
  }
});

module.exports = db;
