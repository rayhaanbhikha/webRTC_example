import io from 'socket.io-client';
import { socketBaseUrl } from './config'

export const socket = io(`${socketBaseUrl}/video-chat`);