import React, { useState } from "react";
import "./video.css";

export default function Video() {
  const [video, setVideo] = useState(false);

  const startVideo = () => {
    setVideo(!video);
  };

  const stopVideo = () => {
    setVideo(!video);
  };

  return (
    <div id="video-block">
      <video src="" width="500" autoPlay></video>
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
