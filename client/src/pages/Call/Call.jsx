import React, { useState } from 'react'
import 'webrtc-adapter'
// import { startCall, stopCall } from './main'
import Video from '../../components/Video/Video';

import './Call.css'

export default function Call(props) {
    const [video, setVideo] = useState(false);
    // const userToCall = props.location.state
    const [stream, setStream] = useState(null);

    const startVideo = async () => {
        // await startCall();
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { width: { min: 1280 }, height: { min: 720 } } });
        console.log(mediaStream);
        document.getElementById("local-video").srcObject = mediaStream;
        document.getElementById("remote-video").srcObject = mediaStream;
        setStream(mediaStream);
        setVideo(!video);
    };

    const stopVideo = async () => {
        // await stopCall();
        stream.getVideoTracks().forEach(track => track.stop());
        document.getElementById("local-video").srcObject = null;
        document.getElementById("remote-video").srcObject = null;
        setVideo(!video);
    };

    return (
        <Video onStart={startVideo} onStop={stopVideo} />
    )
}
