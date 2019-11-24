const server = require('./server');
const {port, ipAddress, protocol} = require("./config");

require('./io');

server.listen(port, ipAddress, () => console.log(`server started on ${protocol}://${ipAddress}:${port}`));