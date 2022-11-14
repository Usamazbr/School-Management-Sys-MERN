import { Navigate, BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
import AdminApp from "./apps/admin/AdminApp";

function App() {
  return (
    <div className="App-div">
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
      {/* <div className="m-auto pages"> */}
      {/* <Routes>
          <Route path="/" element={<StuEdit />} />
        </Routes> */}
      <AdminApp />
      {/* </div> */}
    </div>
  );
}

export default App;
