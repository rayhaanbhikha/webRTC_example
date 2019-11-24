export const rtcConfig = {
    iceServers: [
        {
            urls: "stun:stun.l.google.com:19302"
        }
    ]
};

// assuming in prod server is hosting the client bundle.
export const socketBaseUrl = process.env.NODE_ENV === "development" ? "http://localhost:3004" : "";