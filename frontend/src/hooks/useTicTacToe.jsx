import { useCallback, useEffect, useState } from "react";
import { useSocket } from "../context/Socket";

const initialBoard = Array(9).fill(null);

function useTicTacToe() {
  const socket = useSocket();
  const [gameState, setGameState] = useState({
    roomId: "",
    board: initialBoard,
    currentPlayer: null,
    winner: null,
    isDraw: false,
    players: [],
  });
  const [playerInfo, setPlayerInfo] = useState({
    symbol: null,
    isSpectator: true,
  });

  const updateGameState = useCallback((newState) => {
    setGameState((prev) => ({ ...prev, ...newState }));
  }, []);

  const updatePlayerInfo = useCallback(
    (data) => {
      const player = data.players.find((p) => p.id === socket.id);

      if (player) {
        setPlayerInfo({
          symbol: player.symbol,
          isSpectator: player.isSpectator,
        });
      }
    },
    [socket]
  );

  useEffect(() => {
    const handleRoomData = (data) => {
      updateGameState(data);
      updatePlayerInfo(data);
    };

    const handleUpdateBoard = (data) => {
      updateGameState(data);
      updatePlayerInfo(data);
    };

    socket.on("room-data", handleRoomData);
    socket.on("update-board", handleUpdateBoard);

    return () => {
      socket.off("room-data", handleRoomData);
      socket.off("update-board", handleUpdateBoard);
    };
  }, [socket, updateGameState, updatePlayerInfo]);

  const handleClick = useCallback(
    (index) => {
      if (
        gameState.board[index] ||
        gameState.winner ||
        gameState.isDraw ||
        gameState.currentPlayer !== playerInfo.symbol ||
        playerInfo.isSpectator
      ) {
        return;
      }
      socket.emit("player-move", { roomId: gameState.roomId, index });
    },
    [socket, gameState, playerInfo.symbol, playerInfo.isSpectator]
  );

  const handleReset = useCallback(() => {
    if (!playerInfo.isSpectator) {
      socket.emit("reset-game", gameState.roomId);
    }
  }, [socket, gameState.roomId, playerInfo.isSpectator]);

  const handleExit = useCallback(() => {
    socket.emit("exit-room", gameState.roomId);
  }, [socket, gameState.roomId]);

  return { gameState, playerInfo, handleClick, handleReset, handleExit };
}

export default useTicTacToe;
