import React, { useState } from "react";
import ReactDOM from "react-dom";

import Video from "./components/video/Video";

import * as serviceWorker from "./serviceWorker";
import { socket } from "./socket";

const App = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    socket.emit("join-room", { user: name });
  };
  socket.on("room-full", () => {
    console.log("room is full cannot join");
  });
  socket.on("joined-room", ({room}) => {
    setRoom(room);
  });

  const renderForm = () => {
    return room ? (
      <p>
        {name} you have joined room: {room}{" "}
      </p>
    ) : (
      <>
        <label htmlFor="">Enter Name: </label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <button onClick={joinRoom}> Join room </button>
      </>
    );
  };

  return (
    <>
      <h1>Live stream chat</h1>

      {renderForm()}

      <Video name={name}/>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
