// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");
const uuid = require("uuid");
// =============================================================


// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))

// =============================================================
// API Routes
// =============================================================
// Displays the notes.html page
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// Displays all saved notes as JSON
app.get("/api/notes", function(req, res) {
    // Use the fs package to read the db.json file
  fs.readFile(__dirname + "/db/db.json", function(err, data) {
    if (err) throw err;

    // Respond with the contents of the db.json file
    res.json(JSON.parse(data));
  });
});

// Create a new note - takes in JSON input
app.post("/api/notes", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // Set the newNote object to hold the new note. Use uuid.v4() to generate an id    
    const newNote = {
        title: req.body.title, 
        text: req.body.text,
        id: uuid.v4()
        };
            
    fs.readFile(__dirname + "/db/db.json", (err, data) => {
        if (err) throw err;

        let notes = JSON.parse(data);   // Get the notes stored in db.json. 
        notes.push(newNote);            // Add the new note to the notes array

        // Write the updated array back to the db.json file
        fs.writeFile("./db/db.json", JSON.stringify(notes),"utf-8", err => {
            if (err) throw err;
        });
        res.json(JSON.parse(data));
      });
});

// Delete note using unique id
app.delete("/api/notes/:id", function(req, res) {
    let id = req.params.id;

    fs.readFile(__dirname + "/db/db.json", (err, data) => {
        if (err) throw err;

        let notes = JSON.parse(data);   // Get the notes stored in db.json. 
        let udpatedNotes= notes.filter((item) => item.id !== id);

        // Write the updated array back to the db.json file
        fs.writeFile("./db/db.json", JSON.stringify(udpatedNotes),"utf-8", err => {
            if (err) throw err;
        });
        res.json(JSON.parse(data));
      });
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
