const fs = require('fs');
const os = require('os');

const ipAddress = os.networkInterfaces()['en0'][1].address;

const serverOptions = {
    key: fs.readFileSync("./secrets/server.key"),
    cert: fs.readFileSync("./secrets/server.crt"),
}

const port = process.env.PORT || 3004;

module.exports = {
    port,
    ipAddress,
    serverOptions
}