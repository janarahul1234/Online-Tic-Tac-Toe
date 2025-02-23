import { useState } from "react";
import { useSocket } from "../context/Socket";

import { RiArrowRightLine } from "react-icons/ri";
import Input from "../components/Input";
import Button from "../components/Button";

const Landing = ({ setIsGameStarted }) => {
  const socket = useSocket();
  const [values, setValues] = useState({ playerName: "", roomId: "" });

  const handlePlayerName = (value) => {
    setValues({ ...values, playerName: value });
  };

  const handleRoomId = (value) => {
    setValues({ ...values, roomId: value });
  };

  const handleJoinRoom = () => {
    if (values.playerName && values.roomId) {
      setIsGameStarted(true);
      socket.emit("join-room", values);
    }
  };

  return (
    <section className="h-screen flex items-center justify-center">
      <div>
        <h1 className="text-4xl font-semibold text-center mb-14">
          Tic Tac Toe
        </h1>

        <div className="w-72">
          <div className="space-y-5 mb-7">
            <Input
              id="player-name"
              label="Player name"
              onChange={handlePlayerName}
            />
            <Input id="room-id" label="Room id" onChange={handleRoomId} />
          </div>

          <Button
            label="Join Room"
            icon={RiArrowRightLine}
            onClick={handleJoinRoom}
          />
        </div>
      </div>
    </section>
  );
};

export default Landing;
