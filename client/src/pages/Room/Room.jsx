import React, { useState } from "react";

import { socket } from "../../socket";

import User from '../../components/User/User'

import './Room.css'

export default function Room(props) {
	const { username } = props.location.state;
	const [userInfo, setUserInfo] = useState({ username, id: null });
	const [errorMsg, setErrorMsg] = useState();
	const [joinedRoom, setJoinedRoom] = useState(false);
	const [roomInfo, setRoomInfo] = useState();

	socket.on("room-full", () => setErrorMsg("Room is full"));
	socket.on("you-joined", info => {
		console.log("you joined", info);
		setUserInfo(info);
	});
	socket.on("joined-room", info => {
		console.log(info);
		setRoomInfo(info);
		setJoinedRoom(true);
	});
	socket.on("left-room", info => {
		setRoomInfo(info);
	});

	const joinRoom = () => {
		socket.emit("join-room", { username: userInfo.username });
	};

	const onCall = (user) => {
		console.log(user);
		const location = {
			pathname: "/call",
			state: user
		  }
		props.history.push(location);
	}

	const renderRoom = () => (
		<div className="room-info">
			<div className="room">{roomInfo.room}</div>
			<div className="users">
				{roomInfo.users.map(({ username, id }) =>
					<User key={id} username={username} showCall={username === userInfo.username && id === userInfo.id} onClick={onCall.bind(null, { username, id})} />
				)}
			</div>

		</div>
	);

	return (
		<div className="room-page">
			{errorMsg && <div>{errorMsg}</div>}
			{joinedRoom ? renderRoom() : (
				<div className="join-room">
					<p>welcome {userInfo.username}</p>
					<button onClick={joinRoom}>Join Room</button>
				</div>
			)}
		</div>
	);
}
