const express = require("express");
const https = require('https');
const http = require('http');
const fs = require('fs');

const os = require('os');
const ip = os.networkInterfaces()['en0'][1].address;

const app = express();

const server = https.createServer({
    key: fs.readFileSync("./server.key"),
    cert: fs.readFileSync("./server.crt"),
}, app);
const localServer = http.createServer(app);

app.get("/", (req, res) => {
    res.send("hello world");
})

localServer.listen(8080, () => console.log("server started on http://localhost:8080"));
server.listen(8080, ip, () => console.log(`server started on https://${ip}:8080`));