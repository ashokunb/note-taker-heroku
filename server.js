const express = require("express");
const path = require("path");
const fs = require("fs");

const { notes } = require("./Develop/db/db.json");
const PORT = process.env.PORT || 3001;

const app = express();

// middleware

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('./Develop/public'));

//html routes
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});
app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, './Develop/public'))
})

app.listen(PORT, ()=>{
    console.log(`API server now on port ${PORT}!`);
});