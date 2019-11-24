const server = require("../server");
const joinRoom = require("./join-room");
const disconnecting = require("./disconnecting");
const events = require("./events");

const io = require("socket.io")(server, {
    serveClient: false,
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false
});

const videoChatNsp = io.of("/video-chat");

videoChatNsp.on("connect", socket => {
    console.log("user connected");

    socket.on(events.joinRoom, joinRoom(videoChatNsp, socket));

    socket.on('disconnecting', disconnecting(videoChatNsp, socket));

    socket.on("video-offer", offer => {
        //TODO: need to validate incoming user and check if they exist in the room before broadcasting the message in that room.
        // need to look at how that works. i.e. how do you listen 'on' event handler in individual rooms.
        console.log(offer);
        socket.broadcast.emit("video-offer", offer);
    });

    socket.on("video-answer", answer => {
        console.log(answer);
        socket.broadcast.emit("video-answer", answer);
    });

    socket.on("new-ice-candidate", candidate => {
        console.log("candidate", candidate);
        socket.broadcast.emit("new-ice-candidate", candidate);
    });

    socket.on("stop-call", () => {
        socket.broadcast.emit("call-stopped");
    })

});
