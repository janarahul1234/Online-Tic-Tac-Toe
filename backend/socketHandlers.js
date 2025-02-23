import {
  joinRoom,
  playerMove,
  resetGame,
  exitRoom,
} from "./controllers/GameController.js";

export const handleSocketConnection = (socket, io) => {
  socket.on("join-room", ({ playerName, roomId }) => {
    joinRoom(socket, io, roomId, playerName);
  });

  socket.on("player-move", ({ roomId, index }) => {
    playerMove(socket, io, roomId, index);
  });

  socket.on("reset-game", (roomId) => {
    resetGame(io, roomId);
  });

  socket.on("exit-room", (roomId) => {
    exitRoom(socket, io, roomId);
  });

  socket.on("disconnect", () => {});
};
