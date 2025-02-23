import useTicTacToe from "../hooks/useTicTacToe";

import PlayerBoard from "../components/PlayerBoard";
import Board from "../components/Board";
import Overlay from "../components/Overlay";

const Game = ({ setIsGameStarted }) => {
  const { gameState, playerInfo, handleClick, handleReset, handleExit } =
    useTicTacToe();
  const { roomId, board, currentPlayer, winner, isDraw, players } = gameState;

  const activePlayers = players.filter((p) => !p.isSpectator);
  const winnerPlayer = winner && activePlayers.find((p) => p.symbol === winner);

  const getMessage = () => {
    if (isDraw) return "Game draw!";
    if (playerInfo.isSpectator) return `${winnerPlayer?.name} wins!`;
    return playerInfo.symbol === winner ? "You win!" : "You lose!";
  };

  const handelExitRoom = () => {
    handleExit();
    setIsGameStarted(false);
  };

  return (
    <section className="relative h-screen">
      <header className="w-full md:max-w-[900px] px-6 absolute top-6 left-1/2 transform -translate-x-1/2 flex items-center justify-between z-10">
        {activePlayers.map(({ id, name, symbol, score }, index) => (
          <PlayerBoard
            key={id}
            index={index}
            name={name}
            symbol={symbol}
            score={score}
            currentPlayer={currentPlayer}
          />
        ))}
      </header>

      <Board squares={board} onClick={handleClick} />

      <footer className="text-lg px-6 absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
        <span className="text-gray-400">Room id:</span> {roomId}
      </footer>

      {(winner || isDraw) && (
        <Overlay
          message={getMessage()}
          onReset={handleReset}
          onExitRoom={handelExitRoom}
          spectator={playerInfo.isSpectator}
        />
      )}
    </section>
  );
};

export default Game;
