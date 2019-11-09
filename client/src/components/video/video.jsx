import React, { useState } from "react";
import "./video.css";
import { startCall, stopCall } from "./main";

export default function Video() {
  const [video, setVideo] = useState(false);
  const videoRef = React.createRef();

  const startVideo = async e => {
    await startCall(e, videoRef);

    setVideo(!video);
  };

  const stopVideo = async e => {
    await stopCall(e, videoRef);
    setVideo(!video);
  };

  return (
    <div id="video-block">
      <video ref={videoRef} width="500" autoPlay></video>
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
