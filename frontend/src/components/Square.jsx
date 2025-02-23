import { PLAYER_ICONS } from "../constants.js";

const Square = ({ symbol, onClick }) => {
  return (
    <button
      className="w-[100px] h-[100px] bg-gray-800 flex items-center justify-center rounded-md focus:outline-none transition"
      onClick={onClick}
    >
      {symbol && (
        <img src={PLAYER_ICONS[symbol]} alt="icon" className="w-8/12" />
      )}
    </button>
  );
};

export default Square;
