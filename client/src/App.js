import { Navigate, BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
import StuEdit from "./pages/StuEdit";

function App() {
  return (
    <div className="App-div">
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
      <div className="m-auto pages">
        {/* <Routes>
          <Route path="/" element={<StuEdit />} />
        </Routes> */}
        <StuEdit />
      </div>
    </div>
  );
}

export default App;
