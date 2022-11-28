import { Navigate, BrowserRouter, Routes, Route } from "react-router-dom";
import { useVer } from "./context/VerContext";
import NavBar from "./components/Navbar";
import AdminApp from "./apps/admin/AdminApp";
import StuApp from "./apps/student/StuApp";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TeacApp from "./apps/teacher/TeacApp";

function App() {
  const { user } = useVer();
  // console.log(user);
  return (
    <div className="App-div">
      <BrowserRouter>
        <NavBar />
        <div className="m-auto pages">
          <Routes>
            <Route
              path="/login/*"
              element={!user ? <Login /> : <Navigate to="/admin/*" />}
            />
            <Route
              path="/signup/*"
              element={!user ? <Signup /> : <Navigate to="/admin/*" />}
            />
            {/* <Route
              path="/admin/*"
              element={user ? <AdminApp /> : <Navigate to="/login/*" />}
            /> */}
            <Route
              path="/admin/*"
              element={
                user ? (
                  <>
                    {
                      {
                        1: <AdminApp />,
                        2: <Navigate to="/teacher/*" />,
                        3: <Navigate to="/student/*" />,
                      }[user.admin]
                    }
                  </>
                ) : (
                  <Navigate to="/login/*" />
                )
              }
            />
            <Route
              path="/teacher/*"
              element={user ? <TeacApp /> : <Navigate to="/login/*" />}
            />
            <Route
              path="/student/*"
              element={user ? <StuApp /> : <Navigate to="/login/*" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
