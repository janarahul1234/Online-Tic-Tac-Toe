import { PLAYER_ICONS } from "../constants.js";

const PlayerBoard = ({ index, name, symbol, score, currentPlayer }) => {
  const isOpponent = index === 1;
  const isCurrent = symbol === currentPlayer;

  return (
    <div
      className={`flex items-center gap-4 ${
        isOpponent ? "flex-row-reverse" : ""
      } ${isCurrent ? "" : "opacity-50"}`}
    >
      <div className="min-w-16 bg-gray-800 font-semibold text-[2rem] text-center px-4 py-2 rounded-md">
        {score}
      </div>

      <div
        className={`flex items-center gap-2 mb-1 ${
          isOpponent ? "flex-row-reverse" : ""
        }`}
      >
        <img src={PLAYER_ICONS[symbol]} alt="player icon" />
        <span className="text-xl">{name}</span>
      </div>
    </div>
  );
};

export default PlayerBoard;
