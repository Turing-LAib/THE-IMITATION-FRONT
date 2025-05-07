import { WS_URL } from "@/constants/config";
import { io } from "socket.io-client";
const socket = io(WS_URL);
export default socket;
