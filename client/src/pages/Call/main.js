import { socket } from "../../socket";
import { setLocalStream, Video } from "./video";
import { rtcConfig } from "../../config";
import {
  onicecandidateHandler,
  onnegotiationneededHandler,
  ontrackHandler
} from "./handlers";
import './answer-call'

export const startCall = async (localUserId = "user1", remoteUserId = "user2") => {

  const lpc = new RTCPeerConnection(rtcConfig);
  lpc.onnegotiationneeded = onnegotiationneededHandler(lpc, localUserId, remoteUserId);
  lpc.onicecandidate = onicecandidateHandler(remoteUserId);
  lpc.ontrack = ontrackHandler;

  socket.on("video-answer", async answer => {
    console.log("video-answer event...");
    await lpc.setRemoteDescription(answer.sdp);
  });

  socket.on("new-ice-candidate", async candidate => {
    try {
      console.log("other peer", candidate);
      await lpc.addIceCandidate(candidate.candidate);
    } catch (error) {
      console.log(error.message);
    }
  });

  const stream = await setLocalStream();

  console.log("adding track to peer connection");
  stream
    .getVideoTracks()
    .forEach(track => lpc.addTrack(track, stream));
};

export const stopCall = async () => {
  Video.local.srcObject.getVideoTracks().forEach(track => track.stop());

  Video.local.srcObject = null;
};
