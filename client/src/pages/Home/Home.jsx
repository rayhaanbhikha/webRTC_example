import React, { useState } from "react";

import "./Home.css";
import { socket } from "../../socket";

const Home = props => {
	const inputRef = React.createRef();
	const [errorMsg, setErrorMsg] = useState();
	
	socket.on("join-room-error", msg => setErrorMsg(msg));
	socket.on("you-joined", ({ currentUser, roomInfo }) => {
		const location = {
			pathname: "/room",
			state: {
				user: currentUser,
				roomInfo
			}
		};
		props.history.push(location);
	});

	const handleOnClick = e => {
		const name = inputRef.current.value;
		if(name) {
			socket.emit("join-room", { username: name });
		} else {
			setErrorMsg("username empty");
		}
	};

	return (
		<div id="container">
				{errorMsg && <p className="error-msg">*{errorMsg}</p>}
			<div className="form">
				<div className="room">
					Chat-room-1
				</div>
				<label>Please enter a name:</label>
				<input
					type="text"
					ref={inputRef}
				/>
				<button onClick={handleOnClick}>Join Room</button>
			</div>
		</div>
	);
};

export default Home;
