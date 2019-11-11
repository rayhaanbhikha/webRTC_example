import { socket } from '../../socket'

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
  console.log("video-offer")
  createPeerConnection();
  await lpc.setRemoteDescription(offer.sdp);
  if (!localStream) {
    const localVideo = document.getElementById("local-video");
    localStream = await getMedia(videoConstraints);
    localVideo.srcObject = localStream;
    //TODO: attach local stream to local video.srcObject
  }
  console.log(localStream);
  localStream.getVideoTracks().forEach(track => lpc.addTrack(track, localStream));

  console.log(lpc);
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
  console.log("video-answer event...");
  await lpc.setRemoteDescription(answer.sdp);
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
    console.log("other peer", candidate);
    await lpc.addIceCandidate(candidate.candidate);
  } catch (error) {
    console.log(error.message);
  }
});

const onicecandidateHandler = async event => {
  if (event.candidate) {
    console.log("onicecandidatehandler triggered ....")
    console.log(event.candidate);
    socket.emit("new-ice-candidate", {
      type: "new-ice-candidate",
      target: "user2",
      candidate: event.candidate
    });
  }
};
// ================================================================

const ontrackHandler = event => {
  const remoteVideo = document.getElementById("remote-video");
  console.log("on track handler ....");
  console.log(remoteVideo);
  console.log(event);
  if(event.streams[0]) {
    remoteVideo.srcObject = event.streams[0];
  }
};

function createPeerConnection() {
  lpc = new RTCPeerConnection(rtcConfig);

  lpc.onnegotiationneeded = onnegotiationneededHandler;
  lpc.onicecandidate = onicecandidateHandler;
  lpc.ontrack = ontrackHandler;
}

export const startCall = async (e) => {
  const localVideo = document.getElementById("local-video");
  createPeerConnection();

  localStream = await getMedia(videoConstraints);
  localVideo.srcObject = localStream;

  console.log("adding track to peer connection");
  localStream.getVideoTracks().forEach(track => lpc.addTrack(track, localStream));
};

export const stopCall = async e => {
  const localVideo = document.getElementById("local-video");
  localStream.getVideoTracks().forEach(track => track.stop());
  localVideo.srcObject = null;
};

async function getMedia(constraints) {
  try {
    return navigator.mediaDevices.getUserMedia(constraints);
  } catch (error) {
    console.log("error: ", error);
  }
}
