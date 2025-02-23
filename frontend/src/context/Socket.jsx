import { createContext, useContext, useMemo } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const socket = useMemo(() => io("https://multiplayer-tic-tac-toe-backend-5oul.onrender.com"), []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
