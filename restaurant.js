// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 4000;
var waitList = [
  {
    customerName: "Ahmed",
    customerEmail: "afhaque89@gmail.com",
    customerID: "afhaque89",
    phoneNumber: "979-587-0887"
  }
];
var gotTable = [
  {
    customerName: "Saima",
    customerEmail: "saima@gmail.com",
    phoneNumber: "979-587-0887",
    customerID: "saimacool"
  }
];

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes HTML
// =============================================================

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

// Routes APIs
// =============================================================

app.get("/api/tables", function(req, res) {
  return res.json(gotTable);
});

app.get("/api/waitList", function(req, res) {
  return res.json(waitList);
});

function putOnWaitList(table) {
  app.post("/api/waitlist", function(req, res) {
    console.log(table);
    res.json(table);
  });
}

app.post("/api/tables", function(req, res) {
  var newTable = req.body;
  console.log(newTable);
  if (gotTable.length < 5) {
    gotTable.push(newTable);
    res.json(newTable);
  } else {
    waitList.push(newTable);
    putOnWaitList(newTable);
  }
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
