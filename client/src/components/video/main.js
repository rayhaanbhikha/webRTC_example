import ReactDOM from "react-dom";

const videoConstraints = {
  video: {
    width: 1280,
    height: 720
  }
};

let lpc;

let stream;

const onnegotiationneededHandler = async () => {
  try {
    const offer = await lpc.createOffer();
    await lpc.setLocalDescription(offer);
    console.log(lpc.localDescription);
    //TODO: send the offer to server.
  } catch (error) {}
};

function createPeerConnection() {
  lpc = new RTCPeerConnection({
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302"
      }
    ]
  });

  lpc.onnegotiationneeded = onnegotiationneededHandler;
}

export const startCall = async (e, videoRef) => {
  if (stream) return;

  createPeerConnection();

  await getMedia(videoConstraints);
  const videoElement = ReactDOM.findDOMNode(videoRef.current);
  videoElement.srcObject = stream;

  stream.getVideoTracks().forEach(track => lpc.addTrack(track));
  // await getMedia(videoConstraints);
};

export const stopCall = async (e, videoRef) => {
    stream.getVideoTracks().forEach(track => track.stop());
    const videoElement = ReactDOM.findDOMNode(videoRef.current);
    videoElement.srcObject = null;
};

async function getMedia(constraints) {
  try {
    stream = await navigator.mediaDevices.getUserMedia(constraints);
  } catch (error) {
    console.log("error: ", error);
  }
}
