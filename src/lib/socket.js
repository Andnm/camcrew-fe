import { io } from "socket.io-client";

let socketInstance = null;

export function getSocket() {
    if (!socketInstance) {
        socketInstance = io(
            import.meta.env.VITE_API_URL, {
                transports: ["websocket"],
                withCredentials: true,
            });
    }
    return socketInstance;
}