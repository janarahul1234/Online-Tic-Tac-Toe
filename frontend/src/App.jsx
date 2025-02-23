import { useState } from "react";
import Landing from "./pages/Landing";
import Game from "./pages/Game";

const App = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);

  return (
    <main className="text-white bg-gradient-to-t to-gray-950 from-gray-900">
      {!isGameStarted ? (
        <Landing setIsGameStarted={setIsGameStarted} />
      ) : (
        <Game setIsGameStarted={setIsGameStarted} />
      )}
    </main>
  );
};

export default App;
