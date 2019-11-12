const server = require("http").createServer();

const io = require("socket.io")(server, {
	serveClient: false,
	// below are engine.IO options
	pingInterval: 10000,
	pingTimeout: 5000,
	cookie: false
});

const videoChatNsp = io.of("/video-chat");

class Room {
	constructor(name) {
		this.name = name;
		this.users = [];
	}

	get info() {
		return {
			name: this.name,
			users: this.users
		}
	}

	set addUser(user) {
		this.users.push(user);
	}

	removeUser(user) {
		//TODO: implement this method.
	}
}

const room = new Room('chat-room-1');

videoChatNsp.on("connect", socket => {
	console.log("user connected");

	socket.on("join-room", msg => {
		//TODO: if same room joins then we should just return something.
		console.log("Room: ", videoChatNsp.adapter.rooms["chat-room-1"]);
		if (
			!videoChatNsp.adapter.rooms["chat-room-1"] ||
			videoChatNsp.adapter.rooms["chat-room-1"].length < 2
		) {
			room.addUser = msg.userName;
			socket.user = msg.userName;
			socket.join("chat-room-1");
			console.log(room.info);
			io.in("chat-room-1").emit("joined-room", room.info);
		} else {
			socket.emit("room-full");
		}
	});

	//FIXME: ideally should be a rest endpoint.

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

	//TODO: socket.on('disconnect') needs to be implemented.
	socket.on('disconnect', args => {
		console.log(socket.user);
	})
});

server.listen(3004, () => console.log("server started on port 3004"));
