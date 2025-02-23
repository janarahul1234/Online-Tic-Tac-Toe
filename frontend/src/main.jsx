import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SocketProvider } from "./context/Socket";
import App from "./App.jsx";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SocketProvider>
      <App />
    </SocketProvider>
  </StrictMode>
);
