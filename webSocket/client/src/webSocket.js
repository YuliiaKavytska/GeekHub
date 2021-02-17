import io from "socket.io-client";

const socket = io("http://localhost:8000/"); // для подключения к сеерверу

export default socket;