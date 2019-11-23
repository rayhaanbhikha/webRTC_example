const express = require('express');
const app = express.Router();
const path = require('path');

const PATH_TO_BUNDLE = path.join(__dirname, "..", "client", "build")

app.use(express.static(PATH_TO_BUNDLE));

app.get("/", (req, res) => {
    res.sendFile(path.join(PATH_TO_BUNDLE, "index.html"));
})
module.exports = app;