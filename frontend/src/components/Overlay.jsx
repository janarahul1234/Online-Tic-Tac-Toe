import { RiLogoutBoxLine, RiRestartLine } from "react-icons/ri";
import Button from "./Button";

const Overlay = ({ message, spectator, onReset, onExitRoom }) => {
  return (
    <div className="w-full h-full fixed bg-gray-950/20 backdrop-blur-2xl flex flex-col items-center justify-center gap-10">
      <span className="text-3xl">{message}</span>

      <div className="flex gap-4">
        <Button
          label="Exit Room"
          icon={RiLogoutBoxLine}
          style={Button.TYPES.SECONDARY}
          onClick={onExitRoom}
        />

        {spectator || (
          <Button
            label="Reset"
            icon={RiRestartLine}
            style={Button.TYPES.SECONDARY}
            onClick={onReset}
          />
        )}
      </div>
    </div>
  );
};

export default Overlay;
