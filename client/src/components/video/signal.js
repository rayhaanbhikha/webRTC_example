import io from 'socket.io-client';

const socket = io('http://localhost:3004');

export const sendOffer = (payload) => {
    socket.emit("video-offer", payload);
}


socket.on("video-offer", msg => {
    
})