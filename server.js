const express = require("express");
const path = require("path");
const fs = require("fs");

const { notes } = require("./db/db.json");
const PORT = process.env.PORT || 3001;

const app = express();

// middleware

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('./public'));

function createNote(body, notesArray){
    const newNote = body;
    notesArray.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        json.stringify({ notes: notesArray}, null, 2),
        console.log(body)
    );
    return newNote;
};


app.get('/api/notes', (req, res) => {
    console.log(notes, 'get request');
    res.json(notes);
});


app.post('/api/notes', (req, res) => {
    req.body.id = notes.length.toString();
    res.json(notes);
});

//html routes
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});



app.listen(PORT, ()=>{
    console.log(`API server now on port ${PORT}!`);
});
