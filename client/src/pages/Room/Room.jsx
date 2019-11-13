import React, { useState } from "react";

import { socket } from "../../socket";

export default function Room(props) {
	const { username } = props.location.state;
	const [errorMsg, setErrorMsg] = useState();
	const [joinedRoom, setJoinedRoom] = useState(false);
	const [roomInfo, setRoomInfo] = useState();

	// socket.on("/room/info", info => {
	// 	console.log(roomInfo);
	// })

	socket.on("room-full", () => setErrorMsg("Room is full"));
	socket.on("joined-room", info => console.log(info));
	socket.on("left-room", info => console.log(info));

	const joinRoom = () => {
		socket.emit("join-room", { username });
	};

	const renderRoom = () => { };

	return (
		<div>
			{errorMsg && <div>{errorMsg}</div>}

			{joinedRoom ? renderRoom() : (
				<>
					welcome {username}
					<button onClick={joinRoom}>Join Room</button>
				</>
			)}
		</div>
	);
}
