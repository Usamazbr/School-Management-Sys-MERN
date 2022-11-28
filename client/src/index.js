import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { VerContextWrap } from "./context/VerContext";
import { StuContextWrap } from "./apps/admin/context/StuContext";
import { TeacContextWrap } from "./apps/admin/context/TeacContext";
import { TeacContextWrap2 } from "./apps/teacher/context/TeacContext";
import { StuContextWrap2 } from "./apps/teacher/context/StuContext";
import { TeacContextWrap3 } from "./apps/student/context/TeacContext";
import { MsgContextWrap } from "./apps/student/context/MsgContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <VerContextWrap>
      <StuContextWrap>
        <TeacContextWrap>
          <StuContextWrap2>
            <TeacContextWrap2>
              <MsgContextWrap>
                <TeacContextWrap3>
                  <App />
                </TeacContextWrap3>
              </MsgContextWrap>
            </TeacContextWrap2>
          </StuContextWrap2>
        </TeacContextWrap>
      </StuContextWrap>
    </VerContextWrap>
  </React.StrictMode>
);
