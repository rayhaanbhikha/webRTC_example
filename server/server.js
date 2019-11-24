const app = require('./app');
const { serverOptions } = require("./config");

let server;

if (process.env.NODE_ENV === "development") {
    server = require('http').createServer();
} else {
    server = require('https').createServer(serverOptions, app);
}

module.exports = server;