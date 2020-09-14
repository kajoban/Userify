// create express app
var express = require("express");
var app = express();

//start up server
var HTTP_PORT = 8000;
app.listen(HTTP_PORT, () => {
  console.log(`Server running on port ${HTTP_PORT}`);
});

//root endpoint
app.get("/", (req, res, next) => {
  res.json({ message: "OK" });
});

//TODO: other endpoints

//set default response
app.use(function (req, res) {
  res.status(404);
});
