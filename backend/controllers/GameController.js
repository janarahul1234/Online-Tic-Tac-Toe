import calculateWinner from "../utils/calculateWinner.js";

const INITIAL_BOARD = Array(9).fill(null);
const PLAYER_SYMBOLS = { PLAYER_ONE: "X", PLAYER_TWO: "O" };

const rooms = {};

export const joinRoom = (socket, io, roomId, playerName) => {
  socket.join(roomId);

  if (!rooms[roomId]) {
    rooms[roomId] = {
      roomId,
      board: [...INITIAL_BOARD],
      currentPlayer: PLAYER_SYMBOLS.PLAYER_ONE,
      winner: null,
      isDraw: false,
      players: [],
    };
  }

  const id = socket.id;
  const room = rooms[roomId];

  if (room.players.length < 2) {
    const symbol =
      room.players.length === 0
        ? PLAYER_SYMBOLS.PLAYER_ONE
        : PLAYER_SYMBOLS.PLAYER_TWO;

    room.players.push({
      id,
      name: playerName,
      symbol,
      score: 0,
      isSpectator: false,
    });
  } else {
    room.players.push({ id, name: playerName, isSpectator: true });
  }

  io.to(roomId).emit("room-data", room);
};

export const playerMove = (socket, io, roomId, index) => {
  const room = rooms[roomId];
  if (!room) return;

  const player = room.players.find((p) => p.id === socket.id);

  if (
    !player ||
    player.isSpectator ||
    room.board[index] ||
    player.symbol !== room.currentPlayer
  )
    return;

  room.board[index] = player.symbol;
  room.currentPlayer =
    room.currentPlayer === PLAYER_SYMBOLS.PLAYER_ONE
      ? PLAYER_SYMBOLS.PLAYER_TWO
      : PLAYER_SYMBOLS.PLAYER_ONE;
  room.winner = calculateWinner(room.board);
  room.isDraw = !room.winner && room.board.every(Boolean);

  if (room.winner) {
    const winningPlayer = room.players.find((p) => p.symbol === room.winner);
    if (winningPlayer) winningPlayer.score += 1;
  }

  io.to(roomId).emit("update-board", room);
};

export const resetGame = (io, roomId) => {
  const room = rooms[roomId];

  if (room) {
    const playerOne = room.players.find(
      (p) => p.symbol === PLAYER_SYMBOLS.PLAYER_ONE
    );
    const playerTwo = room.players.find(
      (p) => p.symbol === PLAYER_SYMBOLS.PLAYER_TWO
    );

    if (playerOne && playerTwo) {
      playerOne.symbol = PLAYER_SYMBOLS.PLAYER_TWO;
      playerTwo.symbol = PLAYER_SYMBOLS.PLAYER_ONE;
    }

    room.board = [...INITIAL_BOARD];
    room.currentPlayer = PLAYER_SYMBOLS.PLAYER_ONE;
    room.winner = null;
    room.isDraw = false;

    io.to(roomId).emit("update-board", room);
  }
};

export const exitRoom = (socket, io, roomId) => {
  const room = rooms[roomId];
  if (!room) return;

  room.players = room.players.filter((player) => player.id !== socket.id);

  if (room.players.length === 0) {
    delete rooms[roomId];
  } else {
    io.to(roomId).emit("room-data", room);
  }

  socket.leave(roomId);
};
