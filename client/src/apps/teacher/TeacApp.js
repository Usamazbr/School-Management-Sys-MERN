import { Routes, Route } from "react-router-dom";
import Navbar2 from "./components/Navbar2";
import StuClass from "./pages/StuClass";
// import TeacEdit from "./pages/TeacEdit";
import HomeA from "./pages/HomeA";
import Settings from "./pages/Settings";
import { StuContextWrap } from "./context/StuContext";
import { TeacContextWrap } from "./context/TeacContext";

const TeacApp = () => {
  return (
    <StuContextWrap>
      <TeacContextWrap>
        <div className="flex flex-row mt-2 p-2 h-160 mx-auto bg-stone-400 rounded-lg">
          <Navbar2 />
          <div className="w-5/6 pages">
            <Routes>
              <Route path="/" element={<HomeA />} />
              <Route path="/classes" element={<StuClass />} />
              {/* <Route path="/teacheredit" element={<TeacEdit />} /> */}
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>

          {/* <StuEdit /> */}
        </div>
      </TeacContextWrap>
    </StuContextWrap>
  );
};

export default TeacApp;
