import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/Global.scss";
import { UtilsContextProvider } from "./context/UtilsContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UtilsContextProvider>
      <App />
    </UtilsContextProvider>
  </StrictMode>
);
