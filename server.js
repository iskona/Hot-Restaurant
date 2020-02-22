// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Reservation array

var reserved = [];

var waitList = [];

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

//View Tables

app.get("/table", function (req, res) {
  res.sendFile(path.join(__dirname, "table.html"))
})

app.get("/api/table", function (req, res) {
  return res.json(reserved);
});

//Send waitlist json (APIWaitlistLink)

app.get("/api/waitlist", function (req, res) {
  return res.json(waitList);
});

//

app.get("/reserve", function (req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"))
})

//Post

app.post("/reserve", function (req, res) {
  var customerData = req.body;

  customerData.routeName = customerData.name.replace(/\s+/g, "").toLowerCase();

  if (reserved.length <= 4) {
    reserved.push(customerData);
    res.send("reserved");
  }
  else {

    waitList.push(customerData);
    res.send("waitlist");
  }

  console.log(reserved)
})

app.get("/clear", function (req, res) {
  reserved = [];
  let len = (waitList.length > 5) ? 5 : waitList.length;
  for (let i = 0; i < len; i++) {
    reserved.push(waitList[i]);
    waitList.shift();
  }
  res.sendFile(path.join(__dirname, "table.html"));
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App lostening on port " + PORT);
});