const videoConstraints = {
    video: {
      width: 1280,
      height: 720
    }
  };
  
  let stream;
  
  let lpc;
  
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
  
  const startCall = async e => {
    if (stream) return;
  
    createPeerConnection();
  
    await getMedia(videoConstraints);
    video.srcObject = stream;
    stream.getVideoTracks().forEach(track => lpc.addTrack(track))
    // await getMedia(videoConstraints);
  
    // set
  
    startBtn.disabled = true;
    stopBtn.disabled = false;
  };
  
  startBtn.addEventListener("click", startCall);
  
  stopBtn.addEventListener("click", async e => {
    stream.getVideoTracks().forEach(track => track.stop());
    stream = null;
    video.srcObject = stream;
  
    startBtn.disabled = false;
    stopBtn.disabled = true;
  });
  
  async function getMedia(constraints) {
    try {
      stream = await navigator.mediaDevices.getUserMedia(constraints);
    } catch (error) {
      console.log("error: ", error);
    }
  }
  