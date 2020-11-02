// Dependencies
// =============================================================
var express = require("express");
var path = require("path");


// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))

// Data
// =============================================================
var tables = [];
var reserved = [];

// Routes
// =============================================================


// Displays the notes.html page
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});


// API Routes
// =============================================================
// Displays all saved notes as JSON
app.get("/api/tables", function(req, res) {
    return res.json(tables);
});

// Create a new note - takes in JSON input
app.post("/api/notes", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newNote = req.body;
    
    console.log(newNote);
    
    // checkTables(newCustomer);
    
    res.json(newNote);
});

// Delete note using unique id
app.post("/api/notes/:id", function(req, res) {
    tables = [];
    reserved = [];
});
// Basic route that sends the user first to the AJAX Page
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

// Starts the server to begin listening
// =============================================================
app.listen((PORT), function() {
  console.log("App listening on PORT http://localhost:" + PORT);
});

function checkTables(customer) {
    if(tables.length <5) {
        tables.push(customer);
    }
    else {
        reserved.push(customer);
    }
}
