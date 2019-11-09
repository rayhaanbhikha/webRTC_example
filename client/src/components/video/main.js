import adapter from 'webrtc-adapter';
import ReactDOM from "react-dom";
import io from "socket.io-client";

const socket = io("http://localhost:3004");
const videoConstraints = {
  video: {
    width: 1280,
    height: 720
  }
};
const rtcConfig = {
  iceServers: [
    {
      urls: "stun:stun.l.google.com:19302"
    }
  ]
};
let lpc;
let localStream;


// OTHER PEER.
socket.on("video-offer", async offer => {
  createPeerConnection();
  console.log(lpc);
  console.log(offer);
  await lpc.setRemoteDescription(offer.sdp);
  if (!localStream) {
    localStream = await getMedia(videoConstraints);
  }
  localStream.getVideoTracks().forEach(track => lpc.addTrack(track));

  const answer = await lpc.createAnswer();
  await lpc.setLocalDescription(answer);
  socket.emit("video-answer", {
    type: "video-answer",
    name: "user1",
    target: "user2",
    sdp: answer
  });
});


// PEER WHO STARTED THE EXCHANGE.
socket.on("video-answer", async answer => {
    console.log(answer);
    const sdp = new RTCSessionDescription(answer.sdp);
    await lpc.setRemoteDescription(sdp);
});


const onnegotiationneededHandler = async () => {
  try {
    const offer = await lpc.createOffer();
    await lpc.setLocalDescription(offer);
    console.log(lpc.localDescription);
    socket.emit("video-offer", {
      type: "video-offer",
      name: "user1", //TODO: these would be different.
      target: "user2",
      sdp: offer
    });
  } catch (error) {}
};


// ICE STEPS =====================================================
socket.on("new-ice-candidate", async candidate => {
    try {
        
        // if(candidate.candidate) {
            console.log("other peer", candidate);
            await lpc.addIceCandidate(candidate.candidate);
        // }

        
    } catch (error) {
        console.log(error.message);
    }
})

const onicecandidateHandler = async event => {

    if(event.candidate) {
        console.log(event.candidate);
        socket.emit("new-ice-candidate", {
            type: "new-ice-candidate",
            target: "user2",
            candidate: event.candidate
        });
    }

}
// ================================================================


const ontrackHandler = event => {
    console.log("onTrack", event);
    // const videoElement = ReactDOM.findDOMNode(remoteVideoRef.current);

    // videoElement.srcObject = event.streams[0];
} 

function createPeerConnection() {
  lpc = new RTCPeerConnection(rtcConfig);

  lpc.onnegotiationneeded = onnegotiationneededHandler;
  lpc.onicecandidate = onicecandidateHandler;
  lpc.ontrack = ontrackHandler;
}

export const startCall = async (e, localVideoRef, remoteVideoRef) => {

  createPeerConnection();

  localStream = await getMedia(videoConstraints);
  const videoElement = ReactDOM.findDOMNode(localVideoRef.current);
  videoElement.srcObject = localStream;

  localStream.getVideoTracks().forEach(track => lpc.addTrack(track));
  // await getMedia(videoConstraints);
};

export const stopCall = async (e, localVideoRef) => {
  localStream.getVideoTracks().forEach(track => track.stop());
  const videoElement = ReactDOM.findDOMNode(localVideoRef.current);
  videoElement.srcObject = null;
};

async function getMedia(constraints) {
  try {
    return navigator.mediaDevices.getUserMedia(constraints);
  } catch (error) {
    console.log("error: ", error);
  }
}
