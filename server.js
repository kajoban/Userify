// create express app
var express = require("express");
var app = express();
var db = require("./database.js");
var md5 = require("md5");

//pre-processing utils for POST reqs
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//start up server
var HTTP_PORT = 8000;
app.listen(HTTP_PORT, () => {
  console.log(`Server running on port ${HTTP_PORT}`);
});

//root endpoint
app.get("/", (req, res, next) => {
  res.json({ message: "OK" });
});

//GET all users
app.get("/api/users", (req, res, next) => {
  var sql = "SELECT * FROM user";
  var params = [];
  //retrieve rows from a SQL query
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    } else {
      res.json({
        message: "success",
        data: rows,
      });
    }
  });
});

//GET user by id
app.get("/api/users/:id", (req, res, next) => {
  //dynamically create select statement based on id
  var sql = "SELECT * FROM user WHERE id = ?";
  var params = [req.params.id];
  //.get so we get only 1 row
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    } else {
      res.json({
        message: "success",
        data: row,
      });
    }
  });
});

//CREATE new user
//can use curL to hit:
//curl -d "name=x&email=y&password=z" -X POST http://localhost:8000/api/user/
app.post("/api/user/", (req, res, next) => {
  //req.body will be converted from string -> js object via body parser
  //check mandatory fields
  var errors = [];
  if (!req.body.password) {
    errors.push("No password specified");
  }
  if (!req.body.email) {
    errors.push("No email specified");
  }
  if (errors.length) {
    res.status(400).json({ error: errors.join(",") });
    return;
  }
  //create data object
  var data = {
    name: req.body.name,
    email: req.body.email,
    password: md5(req.body.password),
  };
  var sql = "INSERT INTO user (name, email, password) VALUES (?,?,?)";
  var params = [data.name, data.email, data.password];
  //use classic function notation so we can gett this.lastID
  db.run(sql, params, function (err, result) {
    if (err) {
      res.status(400).json({ error: "error.message" });
      return;
    } else {
      res.json({
        message: "success",
        data: data,
        id: this.lastID,
      });
    }
  });
});

//set default response
app.use(function (req, res) {
  res.status(404);
});
