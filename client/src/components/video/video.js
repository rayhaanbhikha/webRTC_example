const videoConstraints = {
  video: {
    width: 1280,
    height: 720
  }
};

export async function getMedia() {
  try {
    return navigator.mediaDevices.getUserMedia(videoConstraints);
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
