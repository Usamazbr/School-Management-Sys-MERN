import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar2 = () => {
  const [border, setBorder] = useState(1);

  // const handleclick=()=>{}

  return (
    <div className="h-24 w-1/6 p-2 space-y-2 rounded-lg">
      <Link to="/teacher">
        <div className="h-10 w-20 bg-stone-900 rounded-lg">
          <button
            className={`h-10 w-full px-2 text-stone-400 hover:bg-stone-600 hover:text-zinc-900 rounded-lg 
            ${
              border === 1 &&
              "text-black bg-gradient-to-r from-stone-900 to-stone-400 rounded-r-none"
            }
            `}
            onClick={() => setBorder(1)}
          >
            Home
          </button>
        </div>
      </Link>
      <Link to="/teacher/classes">
        <div className="h-10 mt-2 bg-stone-900 rounded-lg">
          <button
            className={`h-10 w-full px-2 text-stone-400 hover:bg-stone-600 hover:text-zinc-900 rounded-lg 
            ${
              border === 2 &&
              "text-black bg-gradient-to-r from-stone-900 to-stone-400 rounded-r-none"
            }
            `}
            onClick={() => setBorder(2)}
          >
            Classes
          </button>
        </div>
      </Link>
      <Link to="/teacher/settings">
        <div className="h-10 mt-2 bg-stone-900 rounded-lg">
          <button
            className={`h-10 w-full px-2 text-stone-400 hover:bg-stone-600 hover:text-zinc-900 rounded-lg 
            ${
              border === 3 &&
              "text-black bg-gradient-to-r from-stone-900 to-stone-400 rounded-r-none"
            }
            `}
            onClick={() => setBorder(3)}
          >
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
