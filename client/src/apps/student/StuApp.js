import { Routes, Route } from "react-router-dom";
import Navbar2 from "./components/Navbar2";
import StuEdit from "./pages/StuEdit";
import TeacEdit from "./pages/TeacEdit";
import HomeA from "./pages/HomeA";
import Settings from "./pages/Settings";
import { StuContextWrap } from "./context/StuContext";
import { TeacContextWrap } from "./context/TeacContext";

const StuApp = () => {
  return (
    <StuContextWrap>
      <TeacContextWrap>
        <div className="flex flex-row mt-2 p-2 h-160 mx-auto bg-lime-900 rounded-lg">
          <Navbar2 />
          <div className="w-5/6 pages">
            <Routes>
              <Route path="/" element={<HomeA />} />
              <Route path="/studentedit" element={<StuEdit />} />
              <Route path="/teacheredit" element={<TeacEdit />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>

          {/* <StuEdit /> */}
        </div>
      </TeacContextWrap>
    </StuContextWrap>
  );
};

export default StuApp;
