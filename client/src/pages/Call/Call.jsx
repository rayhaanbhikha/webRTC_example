import React, { useState } from 'react'

import Video from '../../components/Video/Video';
import Controls from '../../components/Controls/Controls';

import './Call.css'

export default function Call(props) {
    const [video, setVideo] = useState(false);
    const userToCall = props.location.state
    const [stream, setStream] = useState(null);

    const startVideo = async e => {
        // await startCall(e);
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { width: { min: 1280 }, height: { min: 720 } } });
        document.getElementById("local-video").srcObject = mediaStream;
        document.getElementById("remote-video").srcObject = mediaStream;
        setStream(mediaStream);
        setVideo(!video);
    };

    const stopVideo = async () => {
        // await stopCall(e);
        stream.getVideoTracks().forEach(track => track.stop());
        document.getElementById("local-video").srcObject = null;
        document.getElementById("remote-video").srcObject = null;
        setVideo(!video);
    };

    return (
        <div className="call-page">
            <div className="video-feed">
                <Video id="remote-video" />
                <Video id="local-video" />
                <Controls onStart={startVideo} onStop={stopVideo} />
            </div>
            {/* <button id="start-video" onClick={startVideo} disabled={video}> */}
            {/* </button> */}
            {/* <button id="stop-video" onClick={stopVideo} disabled={!video}> */}
            {/* stop video */}
            {/* </button> */}
            {/* <Video id="remote-video" /> */}
        </div>
    )
}
