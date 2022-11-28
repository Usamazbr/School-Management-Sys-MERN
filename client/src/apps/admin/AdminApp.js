import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useTeac } from "./context/TeacContext";
import { useStu } from "./context/StuContext";
import { useVer } from "../../context/VerContext";
import Navbar2 from "./components/Navbar2";
import StuEdit from "./pages/StuEdit";
import TeacEdit from "./pages/TeacEdit";
import HomeA from "./pages/HomeA";
import Settings from "./pages/Settings";

const AdminApp = () => {
  const { user } = useVer();
  const { dispatch } = useTeac();
  const { disp } = useStu();

  // const [teacDet, setTeacDet] = useState();

  useEffect(() => {
    const apiUrl = `http://localhost:5005`;
    const dataFetch = async () => {
      // console.log(dis2);
      const response = await fetch(apiUrl + "/api/teachers/data", {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "DISPLAY", payload: json.data });

        const response = await fetch(apiUrl + "/api/students/data/", {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${user.token}`,
          },
        });
        const json2 = await response.json();

        if (response.ok) {
          console.log(json2.data);
          await disp({ type: "DISPLAY", payload: json2.data });
        }
      }
      if (!response.ok) {
        console.log(json);
      }
    };

    dataFetch();
  }, [user, dispatch, disp]);
  return (
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
  );
};

export default AdminApp;
