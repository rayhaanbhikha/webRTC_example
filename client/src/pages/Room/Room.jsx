import React, { useState } from "react";

import { socket } from "../../socket";
import User from '../../components/User/User'

import './Room.css'

export default function Room(props) {
	const { user, roomInfo: defaultRoomInfo } = props.location.state;
	const [roomInfo, setRoomInfo] = useState(defaultRoomInfo);

	socket.on("joined-room", info => {
		setRoomInfo(info);
	});

	socket.on("left-room", info => {
		setRoomInfo(info);
	});

	const onCall = (user) => {
		console.log(user);
		const location = {
			pathname: "/call",
			state: user
		}
		props.history.push(location);
	}

	return (
		<div className="room-page">
			<div className="room-info">
				<div className="room">{roomInfo.room}</div>
				<div className="users">
					{ roomInfo.users.filter(({username, id}) => user.id !== id && user.username !== username ).map(({username, id}) => 
						<User key={id} username={username} onClick={onCall.bind(null, { username, id })} />
					)}
				</div>
			</div>
		</div>
	);
}
