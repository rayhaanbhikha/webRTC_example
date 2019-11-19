import { socket } from '../../socket';
import { setLocalStream } from './video';
import { rtcConfig } from './config';
import {
    onicecandidateHandler,
    onnegotiationneededHandler,
    ontrackHandler
} from "./handlers";

socket.on("video-offer", async offer => {
    const localUserId = "user1";
    const remoteUserId = "user2";

    console.log("video-offer");
    const lpc = new RTCPeerConnection(rtcConfig);
    lpc.onnegotiationneeded = onnegotiationneededHandler(lpc, localUserId, remoteUserId);
    lpc.onicecandidate = onicecandidateHandler(remoteUserId);
    lpc.ontrack = ontrackHandler;
    await lpc.setRemoteDescription(offer.sdp);

    const stream = await setLocalStream();

    console.log("adding track to peer connection");
    stream
      .getVideoTracks()
      .forEach(track => lpc.addTrack(track, stream));

    console.log(lpc);
    const answer = await lpc.createAnswer();
    await lpc.setLocalDescription(answer);
    socket.emit("video-answer", {
        type: "video-answer",
        name: "user1",
        target: "user2",
        sdp: answer
    });
    newIceCandidate(lpc);
});


// REMOTE PEER
const newIceCandidate = lpc => {
    socket.on("new-ice-candidate", async candidate => {
        try {
            console.log("other peer", candidate);
            await lpc.addIceCandidate(candidate.candidate);
        } catch (error) {
            console.log(error.message);
        }
    });
};