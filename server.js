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

const reserved = [
    {
        routeName: "susan",
        name: "Susan ",
        phoneNumber: 123455678,
        email: "susan@gmail.com",
        ID: 24
    },

    {
        routeName: "RachelGreen",
        name: "Rachel Green ",
        phoneNumber: 987654,
        email: "RGreen@gmail.com",
        ID: 25
    }
];
const waitList = [
    {
        routeName: "Mike Hannigan",
        name: "Mike ",
        phoneNumber: 5362762735,
        email: "MHan@gmail.com",
        ID: 26
    },

    {
        routeName: "NeilOwens",
        name: "Neil Owens ",
        phoneNumber: 8773424765,
        email: "NOwens@gmail.com",
        ID: 27
    }
];

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
  });

// app.get("/", function(req, res){
//     res.send("HomePage");
// });

//View Tables

app.get("/table", function(req, res){
    res.sendFile(path.join(__dirname, "table.html"))
})

app.get("/api/table", function(req, res){
    return res.json(reserved);
});

//Send waitlist json (APIWaitlistLink)

app.get("/api/waitlist", function(req, res){
    return res.json(waitList);
});

//

app.get("/reserve", function(req, res){
    res.sendFile(path.join(__dirname, "reserve.html"))
})

// app.get("/reserve", function(req, res){
//     res.send("Reservation Page");
// })

//Post

app.post("/reserve", function(req, res){
    var customerData = req.body;

    customerData.routeName = customerData.name.replace(/\s+/g, "").toLowerCase();

    if(reserved.length <= 4)
    {
        reserved.push(customerData);
    }
    else{
        waitList.push(customerData);
    }

    res.send("customer successfully added");
})


















// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App lostening on port " + PORT);
});