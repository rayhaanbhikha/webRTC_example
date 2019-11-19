const Room = require("./Room");

const server = require("http").createServer();

const io = require("socket.io")(server, {
	serveClient: false,
	pingInterval: 10000,
	pingTimeout: 5000,
	cookie: false
});

const videoChatNsp = io.of("/video-chat");

const getRoom = room => () => videoChatNsp.adapter.rooms[room];
const defaultRoom = "chat-room-1";
const chatRoom1 = getRoom(defaultRoom);

const events = {
	joinRoom: "join-room",
	joinedRoom: "joined-room",
	leftRoom: "left-room",
	roomFull: "room-full"
}


const room = new Room(defaultRoom);

videoChatNsp.on("connect", socket => {
	console.log("user connected");

	socket.on(events.joinRoom, ({ username }) => {
		if (!chatRoom1() || chatRoom1().length < 2) {
			socket.join(defaultRoom)
			socket.username = username;
			room.addUser(username, socket.id);
			socket.emit("you-joined", {
				currentUser: { username, id: socket.id },
				roomInfo: room.info
			})
			videoChatNsp.to(defaultRoom).emit(events.joinedRoom, room.info);
		} else {
			socket.emit(events.roomFull);
		}
	});

	socket.on('disconnecting', () => {
		console.log("user-disconnected");
		if (socket.rooms && defaultRoom in socket.rooms) {
			socket.leave(defaultRoom);
			room.removeUser(socket.id);
			videoChatNsp.to(defaultRoom).emit(events.leftRoom, room.info);
		}
	});

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

});

server.listen(3004, () => console.log("server started on port 3004"));
