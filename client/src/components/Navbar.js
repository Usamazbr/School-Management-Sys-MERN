import { useEffect } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  useEffect(() => {}, []);

  return (
    <header className="flex flex-row relative">
      <Link to="/">
        <h1 className="text-5xl font-bold text-neutral-500 shadow-neutral-500/50 hover:text-white leading-tight text-center">
          Student Forum
        </h1>
      </Link>
      <div className="w-6/12"></div>
      <nav className="flex flex-row absolute top-2 right-4 text-neutral-500 w-1/12">
        <span className="p-2">email</span>
        <button className="p-2 hover:text-white">logout</button>
      </nav>
    </header>
  );
};

export default NavBar;
