import { Routes, Route } from "react-router-dom";
import { StuContextWrap } from "./context/StuContext";
import { TeacContextWrap } from "./context/TeacContext";
import Navbar2 from "./components/Navbar2";
import StuEdit from "./pages/StuEdit";
import TeacEdit from "./pages/TeacEdit";
import HomeA from "./pages/HomeA";
import Settings from "./pages/Settings";

const AdminApp = () => {
  return (
    <StuContextWrap>
      <TeacContextWrap>
        <div className="flex flex-row mt-2 p-2 h-160 mx-auto bg-stone-800 rounded-lg">
          {/* <BrowserRouter> */}
          <Navbar2 />
          <div className="w-5/6 pages">
            <Routes>
              <Route path="/" element={<HomeA />} />
              <Route path="/studentedit" element={<StuEdit />} />
              <Route path="/teacheredit" element={<TeacEdit />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
          {/* </BrowserRouter> */}
          {/* <StuEdit /> */}
        </div>
      </TeacContextWrap>
    </StuContextWrap>
  );
};

export default AdminApp;
