const videoConstraints = {
  video: {
    width: 1280,
    height: 720
  }
};

export async function setLocalStream() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(videoConstraints);
    Video.local.srcObject = stream;
    return stream;
  } catch (error) {
    console.log("error: ", error);
  }
}

export class Video {
    static get local() {
        return document.getElementById('local-video');
    }

    static get remote() {
        return document.getElementById('remote-video');
    }
}
