import Square from "./Square";

const Board = ({ squares, onClick }) => {
  const handleClick = (index) => () => {
    return onClick(index);
  };

  return (
    <div className="w-max absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 grid grid-cols-3 gap-2">
      {squares.map((symbol, index) => (
        <Square key={index} symbol={symbol} onClick={handleClick(index)} />
      ))}
    </div>
  );
};

export default Board;
