import { io } from "socket.io-client";
const server_URL = "http://localhost:3008";

const socket = io(server_URL);

export { socket };
