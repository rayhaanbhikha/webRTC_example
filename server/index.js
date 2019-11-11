const server = require('http').createServer();

const io = require('socket.io')(server, {
  serveClient: false,
  // below are engine.IO options
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false
});

const videoChatNsp = io.of("/video-chat");



videoChatNsp.on("connect", socket => {
    console.log("user connected");

    socket.on("join-room", msg => {
        if(!videoChatNsp.adapter.rooms['chat-room-1'] || videoChatNsp.adapter.rooms['chat-room-1'].length < 2) {
            socket.join('chat-room-1');
            socket.emit("joined-room", { room: 'chat-room-1' });
        } else {
            socket.emit("room-full");
        }
    })

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