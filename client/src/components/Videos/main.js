import { socket } from "../../socket";
import { getMedia, Video } from "./video";

const rtcConfig = {
  iceServers: [
    {
      urls: "stun:stun.l.google.com:19302"
    }
  ]
};
let lpc; //TODO: extract this into separate file. Makes code cleaner.
let localStream;

// OTHER PEER.
socket.on("video-offer", async offer => {
  console.log("video-offer");
  alert("someone is calling you");
  //FIXME: once call is accepted you should bypass the startcall step.
  createPeerConnection();
  await lpc.setRemoteDescription(offer.sdp);
  if (!localStream) {
    localStream = await getMedia();
    Video.local.srcObject = localStream;
  }
  console.log(localStream);
  localStream
    .getVideoTracks()
    .forEach(track => lpc.addTrack(track, localStream));

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
    console.log("onicecandidatehandler triggered ....");
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
  console.log("on track handler ....");
  if (event.streams[0]) {
    Video.remote.srcObject = event.streams[0];
  }
};

function createPeerConnection() {
  lpc = new RTCPeerConnection(rtcConfig);

  lpc.onnegotiationneeded = onnegotiationneededHandler;
  lpc.onicecandidate = onicecandidateHandler;
  lpc.ontrack = ontrackHandler;
}

export const startCall = async e => {
  createPeerConnection();

  localStream = await getMedia();
  Video.local.srcObject = localStream;

  console.log("adding track to peer connection");
  localStream
    .getVideoTracks()
    .forEach(track => lpc.addTrack(track, localStream));
};

export const stopCall = async e => {
  localStream.getVideoTracks().forEach(track => track.stop());
  Video.local.srcObject = null;
};
