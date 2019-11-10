import React, { useState } from "react";
import "./Room.css";

export default function Room(props) {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    props.setuserInfo({ name, room });
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>User Info</p>
      <div className="user-text">
        <label htmlFor="">Enter Name: </label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>
      <div className="user-text">
        <label htmlFor="">Enter Room: </label>
        <input
          type="text"
          value={room}
          onChange={e => setRoom(e.target.value)}
        />
      </div>
      <input type="submit" disabled={!(name && room)} />
    </form>
  );
}
