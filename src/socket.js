import io from "socket.io-client";

const socketUrl = process.env.NODE_ENV === "development"
? process.env.REACT_APP_DEV_WEB_URL
: process.env.REACT_APP_WEB_URL;

export const socket = io.connect(socketUrl);
