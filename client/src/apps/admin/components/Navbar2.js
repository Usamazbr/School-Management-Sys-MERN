import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar2 = () => {
  const [border, setBorder] = useState(1);

  return (
    <div className="h-24 w-1/6 p-2 space-y-2 rounded-lg">
      <Link to="/admin">
        <div className="h-10 w-20 bg-stone-900 rounded-lg">
          <button
            className={`h-10 w-full px-2 text-stone-400 hover:bg-stone-600 hover:text-zinc-900 rounded-lg 
            ${
              border === 1 &&
              "bg-gradient-to-r from-stone-900 to-stone-800 hover:text-stone-400 rounded-r-none"
            }
            `}
            onClick={() => setBorder(1)}
          >
            Home
          </button>
        </div>
      </Link>
      <Link to="/admin/studentedit">
        <div className="h-10 mt-2 bg-stone-900 rounded-lg">
          <button
            className={`h-10 w-full px-2 text-stone-400 hover:bg-stone-600 hover:text-zinc-900 rounded-lg 
            ${
              border === 2 &&
              "bg-gradient-to-r from-stone-900 to-stone-800 hover:text-stone-400 rounded-r-none"
            }
            `}
            onClick={() => setBorder(2)}
          >
            {" "}
            Student Database
          </button>
        </div>
      </Link>
      <Link to="/admin/teacheredit">
        <div className="h-10 mt-2 bg-stone-900 rounded-lg">
          <button
            className={`h-10 w-full px-2 text-stone-400 hover:bg-stone-600 hover:text-zinc-900 rounded-lg 
            ${
              border === 3 &&
              "bg-gradient-to-r from-stone-900 to-stone-800 hover:text-stone-400 rounded-r-none"
            }
            `}
            onClick={() => setBorder(3)}
          >
            Teacher Database
          </button>
        </div>
      </Link>
      <Link to="/admin/settings">
        <div className="h-10 mt-2 bg-stone-900 rounded-lg">
          <button
            className={`h-10 w-full px-2 text-stone-400 hover:bg-stone-600 hover:text-zinc-900 rounded-lg 
            ${
              border === 4 &&
              "bg-gradient-to-r from-stone-900 to-stone-800 hover:text-stone-400 rounded-r-none"
            }
            `}
            onClick={() => setBorder(4)}
          >
            {" "}
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
