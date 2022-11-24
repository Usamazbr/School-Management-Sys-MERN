import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { VerContextWrap } from "./context/VerContext";
import { TeacContextWrap2 } from "./apps/teacher/context/TeacContext";
import { StuContextWrap2 } from "./apps/teacher/context/StuContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <VerContextWrap>
      <StuContextWrap2>
        <TeacContextWrap2>
          <App />
        </TeacContextWrap2>
      </StuContextWrap2>
    </VerContextWrap>
  </React.StrictMode>
);
