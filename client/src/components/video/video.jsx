import React, { useState } from "react";
import "./video.css";
import { startCall, stopCall } from "./main";

export default function Video() {
  const [video, setVideo] = useState(false);
  const localVideoRef = React.createRef();
  const remoteVideoRef = React.createRef();

  const startVideo = async e => {
    await startCall(e, localVideoRef, remoteVideoRef);

    setVideo(!video);
  };

  const stopVideo = async e => {
    await stopCall(e, localVideoRef);
    setVideo(!video);
  };

  return (
    <div id="video-block">
      <video ref={localVideoRef} width="500" autoPlay></video>
      <video ref={remoteVideoRef} width="500" autoPlay></video>
      <div id="controls">
        <button id="start-video" onClick={startVideo} disabled={video}>
          start video
        </button>
        <button id="stop-video" onClick={stopVideo} disabled={!video}>
          stop video
        </button>
      </div>
    </div>
  );
}
