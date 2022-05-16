const express = require("express");
const path = require("path");
const fs = require("fs");

const { notes } = require("./Develop/db/db.json");
const PORT = process.env.PORT || 3000;

const app = express();

