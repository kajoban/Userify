// create express app
var express = require("express");
var app = express();
var db = require("./database.js");

//start up server
var HTTP_PORT = 8000;
app.listen(HTTP_PORT, () => {
  console.log(`Server running on port ${HTTP_PORT}`);
});

//root endpoint
app.get("/", (req, res, next) => {
  res.json({ message: "OK" });
});

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

//set default response
app.use(function (req, res) {
  res.status(404);
});
