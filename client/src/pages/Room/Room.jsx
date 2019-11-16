import React, { useState } from "react";

import { socket } from "../../socket";

import User from '../../components/User/User'

import './Room.css'

export default function Room(props) {
	const { username } = props.location.state;
	const [errorMsg, setErrorMsg] = useState();
	const [joinedRoom, setJoinedRoom] = useState(false);
	const [roomInfo, setRoomInfo] = useState();

	socket.on("room-full", () => setErrorMsg("Room is full"));
	socket.on("joined-room", info => {
		console.log(info);
		setRoomInfo(info);
		setJoinedRoom(true);
	});
	socket.on("left-room", info => {
		setRoomInfo(info);
	});

	const joinRoom = () => {
		socket.emit("join-room", { username });
	};

	const renderRoom = () => (
		<div className="room-info">
			<div className="room">{roomInfo.room}</div>
			<div className="users">
				{roomInfo.users.map(({ username, id }) =>
					<User key={id} username={username} onClick={() => console.log("hello")} />
				)}
			</div>

		</div>
	);

	return (
		<div className="room-page">
			{errorMsg && <div>{errorMsg}</div>}
			{joinedRoom ? renderRoom() : (
				<>
					<p>welcome {username}</p>
					<button onClick={joinRoom}>Join Room</button>
				</>
			)}
		</div>
	);
}
