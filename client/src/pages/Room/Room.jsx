import React, { useState } from "react";

import { socket } from "../../socket";

export default function Room(props) {
	const { userName } = props.location.state;
	const [errorMsg, setErrorMsg] = useState();

	socket.on("room-full", () => setErrorMsg("Room is full"));
	socket.on("joined-room", info => console.log(info));

	const joinRoom = () => {
		socket.emit("join-room", { userName });
	};

	return (
		<div>
			{errorMsg && <div>{errorMsg}</div>}
			welcome {userName}
			<button onClick={joinRoom}>Join Room</button>
		</div>
	);
}
