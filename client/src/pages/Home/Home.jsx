import React, { useState } from "react";

import "./Home.css";

const Home = props => {
	const [name, setname] = useState("");

	const handleOnSubmit = e => {
	e.preventDefault();

	const location = {
	  pathname: "/room",
	  state: {
		userName: name
	  }
	};
	props.history.push(location);
  };

  return (
	<div id="container">
	  <form onSubmit={handleOnSubmit}>
		<label>Please enter a name:</label>
		<input
			type="text"
			value={name}
			onChange={e => setname(e.target.value)}
		/>
		<input type="submit" />
	  </form>
	</div>
  );
};

export default Home;
