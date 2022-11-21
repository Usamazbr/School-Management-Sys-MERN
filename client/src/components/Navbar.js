// import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useVer } from "../context/VerContext";
import { useLogout } from "./Logout";

const NavBar = () => {
  const { user } = useVer();
  // useEffect(() => {}, []);
  const { logout } = useLogout();
  const handleClick = () => {
    logout();
  };

  return (
    <header className="flex flex-row ">
      <Link className=" w-4/12" to="/">
        <h1 className="text-5xl font-bold text-neutral-500 shadow-neutral-500/50 hover:text-white leading-tight text-center">
          Student Forum
        </h1>
      </Link>
      <div className="w-4/12 "></div>
      <nav className="flex flex-row w-4/12 top-2 right-4 text-neutral-500">
        {user ? (
          <div className="m-auto mt-6">
            <span className="p-2">{user.email}</span>
            <button
              className="p-2 hover:text-red-400 border hover:border-red-400 rounded-lg"
              onClick={handleClick}
            >
              logout
            </button>
          </div>
        ) : (
          <div className="m-auto mt-7">
            <Link
              className="m-2 p-2 hover:text-white border rounded-lg"
              to="/student"
            >
              Student
            </Link>
            <Link
              className="m-2 p-2 hover:text-white border rounded-lg"
              to="/login"
            >
              Login
            </Link>
            <Link
              className="m-2 p-2 hover:text-white border rounded-lg"
              to="/signup"
            >
              Signup
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default NavBar;
