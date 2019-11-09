const video = document.querySelector("video");
const startBtn = document.getElementById("start-video");
const stopBtn = document.getElementById("stop-video");

const videoConstraints = {
  video: {
    width: 1280,
    height: 720
  }
};

let stream;

startBtn.addEventListener("click", async e => {
  if (stream) return;

  await getMedia(videoConstraints);
  video.srcObject = stream;

  startBtn.disabled = true;
  stopBtn.disabled = false;
});

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
