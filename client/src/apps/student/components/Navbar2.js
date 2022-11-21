import { Link } from "react-router-dom";
const Navbar2 = () => {
  return (
    <div className="h-24 w-1/6 p-2 space-y-2 rounded-lg">
      <Link to="/">
        <div className="h-10 w-20 bg-stone-900 rounded-lg">
          <button className="h-10 w-full px-2 text-stone-500 hover:bg-zinc-600 hover:text-zinc-800 rounded-lg">
            Home
          </button>
        </div>
      </Link>
      <Link to="/admin/studentedit">
        <div className="h-10 mt-2 bg-stone-900 rounded-lg">
          <button className="h-10 w-full px-2 text-stone-500 hover:bg-zinc-600 hover:text-zinc-800 rounded-lg">
            Student Database
          </button>
        </div>
      </Link>
      <Link to="/admin/teacheredit">
        <div className="h-10 mt-2 bg-stone-900 rounded-lg">
          <button className="h-10 w-full px-2 text-stone-500 hover:bg-zinc-600 hover:text-zinc-800 rounded-lg">
            Teacher Database
          </button>
        </div>
      </Link>
      <Link to="/admin/settings">
        <div className="h-10 mt-2 bg-stone-900 rounded-lg">
          <button className="h-10 w-full px-2 text-stone-500 hover:bg-zinc-600 hover:text-zinc-800 rounded-lg">
            Settings
          </button>
        </div>
      </Link>
      <div className="h-10 bg-stone-900 rounded-lg"></div>
      <div className="h-10 bg-stone-900 rounded-lg"></div>
      <div className="h-10 bg-stone-900 rounded-lg"></div>
      <div className="h-10 bg-stone-900 rounded-lg"></div>
    </div>
  );
};

export default Navbar2;
