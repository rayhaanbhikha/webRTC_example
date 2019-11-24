const fs = require('fs');
const os = require('os');

const networkInterface = process.env.NODE_ENV === "development" ? "lo0" : "en0";
const ipAddress = os.networkInterfaces()[networkInterface].find(({ family }) => family === 'IPv4').address;

const serverOptions = {
    key: fs.readFileSync("./secrets/server.key"),
    cert: fs.readFileSync("./secrets/server.crt"),
}

const port = process.env.PORT || 3004;

module.exports = {
    port,
    ipAddress,
    serverOptions,
    protocol: process.env.NODE_ENV === "development" ? "http" : "https"
}