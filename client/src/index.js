import React, { useState } from "react";
import ReactDOM from "react-dom";

import Video from "./components/video/Video";
import Room from "./components/room/Room";

import * as serviceWorker from "./serviceWorker";

const App = () => {
  const [userInfo, setuserInfo] = useState();

  const render = () => {
    if (!userInfo) {
      return <Room setuserInfo={setuserInfo} />;
    } else {
      return (
        <>
          <p>user: {userInfo.name}</p>
          <p>room: {userInfo.room}</p>
          <Video />
        </>
      );
    }
  };

  return (
    <>
      <h1>Live stream chat</h1>
      {render()}
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
