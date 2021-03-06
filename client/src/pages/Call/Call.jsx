import React, { useState } from 'react'
import 'webrtc-adapter'
import { startCall, stopCall } from './main'
import Video from '../../components/Video/Video';
import { socket } from '../../socket';
import { answerVideoOffer } from './answer-call';

import './Call.css'

export default function Call(props) {
    const [active, setActive] = useState(false);
    // const userToCall = props.location.state
    const [stream, setStream] = useState(null);

    socket.on("call-stopped", async () => {
        if(active) {
            setActive(!active);
            await stopCall();
        }
    })

    socket.on("video-offer", async offer => {
        setActive(!active);
        alert("someone is calling you");
        await answerVideoOffer(offer)
    });

    const startVideo = async () => {
        console.log("hello world");
        await startCall();
        // const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { width: { min: 1280 }, height: { min: 720 } } });
        // console.log(mediaStream);
        // document.getElementById("local-video").srcObject = mediaStream;
        // document.getElementById("remote-video").srcObject = mediaStream;
        // setStream(mediaStream);
        setActive(!active);
    };

    const stopVideo = async () => {
        await stopCall();
        socket.emit("stop-call");
        // stream.getVideoTracks().forEach(track => track.stop());
        // document.getElementById("local-video").srcObject = null;
        // document.getElementById("remote-video").srcObject = null;
        setActive(!active);
    };

    const onClick = async () => {
        if (active) {
            await stopVideo();
        } else {
            await startVideo();
        }
    }

    return (
        <>
            <Video active={active} onClick={onClick} />
        </>
    )
}
