import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useTeac } from "./context/TeacContext";
import { useMsg } from "./context/MsgContext";
import { useVer } from "../../context/VerContext";
import Navbar3 from "./components/Navbar3";
import StuNews from "./pages/StuNews";
import HomeA from "./pages/HomeA";
import Settings from "./pages/Settings";

const StuApp = () => {
  const { user } = useVer();
  const { dispatch } = useTeac();
  const { disp } = useMsg();

  // const [teacDet, setTeacDet] = useState();

  useEffect(() => {
    const apiUrl = `http://localhost:5005`;
    const dataFetch = async () => {
      const response = await fetch(apiUrl + "/api/students/data1", {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      if (response.ok) {
        console.log(json.data);
        await dispatch({ type: "SET", payload: json.data });

        // fetching news and alets
        const response2 = await fetch(
          apiUrl + "/api/students/msg/" + json.data._id,
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${user.token}`,
            },
          }
        );
        const json2 = await response2.json();
        if (response2.ok) {
          console.log(json2.data);
          await disp({ type: "DISPLAY", payload: json2.data });
        }
      }

      if (!response.ok) {
        console.log(json);
      }
    };
    dataFetch();
  }, [dispatch, disp, user]);

  return (
    <div className="flex flex-row mt-2 p-2 h-160 mx-auto bg-yellow-600 rounded-lg">
      <Navbar3 />
      <div className="w-5/6 pages">
        <Routes>
          <Route path="/" element={<HomeA />} />
          <Route path="/news" element={<StuNews />} />
          {/* <Route path="/teacheredit" element={<TeacEdit />} /> */}
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>

      {/* <StuEdit /> */}
    </div>
  );
};

export default StuApp;
