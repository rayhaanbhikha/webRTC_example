import { socket } from '../../socket';
import { Video } from './video';

export const onicecandidateHandler = userId => async event => {
    if (event.candidate) {
        console.log("[onicecandidatehandler] triggered ....");
        console.log(event.candidate);
        socket.emit("new-ice-candidate", {
            type: "new-ice-candidate",
            target: userId,
            candidate: event.candidate
        });
    }
};

export const onnegotiationneededHandler = (lpc, localUserId, remoteUserId) => async () => {
    console.log("[onnegotiationneededHandler] triggered ....");
    try {
        const offer = await lpc.createOffer();
        await lpc.setLocalDescription(offer);
        console.log(lpc.localDescription);
        socket.emit("video-offer", {
            type: "video-offer",
            name: localUserId,
            target: remoteUserId,
            sdp: offer
        });
    } catch (error) { 
        console.err(error.message);
    }
};


export const ontrackHandler = event => {
    console.log("[ontrackHandler] triggered ....");
    if (event.streams[0]) {
        console.log(event.streams)
        Video.remote.srcObject = event.streams[0];
    }
};
