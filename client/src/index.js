import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { VerContextWrap } from "./context/VerContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <VerContextWrap>
      <App />
    </VerContextWrap>
  </React.StrictMode>
);
