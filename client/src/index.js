import React from "react";
import ReactDOM from "react-dom";

import Video from "./components/video/video";
import * as serviceWorker from "./serviceWorker";

const App = () => (
  <>
    <h1>Live stream chat</h1>

    <form>
      Join Room:
      <input type="text" />
      <input type="submit" />
    </form>
    <Video />
  </>
);

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
