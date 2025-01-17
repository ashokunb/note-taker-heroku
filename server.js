const express = require('express');
const path = require("path");
const fs = require("fs");

const { notes } = require("./db/db.json");
//const notes = JSON.parse(fs.readFileSync("./db/db.json"));
console.log(notes);
const PORT = process.env.PORT || 5000;

const app = express();

// middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("./public"));

function createNote(body, notesArray) {
    const newNote = body;
    notesArray.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, "./db/db.json"),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    return newNote;
}

app.get("/api/notes/:id", (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
      } else {
        res.send(404);
      }
});

function findById(id, noteArray) {
    const result = noteArray.filter(note => note.id === id)[0];
    return result;
}


app.get("/api/notes", (req, res) => {
    let results = notes;
    res.json(results);
});


app.post("/api/notes", (req, res) => {
    req.body.id = notes.length.toString();
    let notesone = createNote(req.body, notes)
    res.json(notesone);
});

//html routes
app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});
app.get("/notes", (req,res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});



app.listen(PORT, ()=>{
    console.log(`API server now on port ${PORT}!`);
});
