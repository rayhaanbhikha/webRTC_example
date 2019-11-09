const server = require('http').createServer();

const io = require('socket.io')(server, {
  serveClient: false,
  // below are engine.IO options
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false
});

io.on("connect", socket => {
    console.log("user connected");


    socket.on("video-offer", offer => {
        console.log(offer);
        socket.broadcast.emit("video-offer", offer);
    })

    socket.on("video-answer", answer => {
        console.log(answer);
        socket.broadcast.emit("video-answer", answer);
    })

    socket.on("new-ice-candidate", candidate => {
        console.log("candidate", candidate);
        socket.broadcast.emit("new-ice-candidate", candidate);
    })

})

server.listen(3004, () => console.log("server started on port 3004"));