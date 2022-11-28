import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar3 = () => {
  const [border, setBorder] = useState(1);

  // const handleclick=()=>{}

  return (
    <div className="h-24 w-1/6 p-2 space-y-2 rounded-lg">
      <Link to="/student">
        <div className="h-10 w-20 bg-green-900 rounded-lg">
          <button
            className={`h-10 w-full px-2 text-green-400 hover:bg-green-600 hover:text-zinc-900 rounded-lg 
            ${
              border === 1 &&
              "text-black bg-gradient-to-r from-green-900 to-yellow-600 rounded-r-none"
            }
            `}
            onClick={() => setBorder(1)}
          >
            Home
          </button>
        </div>
      </Link>
      <Link to="/student/news">
        <div className="h-10 mt-2 bg-green-900 rounded-lg">
          <button
            className={`h-10 w-full px-2 text-green-400 hover:bg-green-600 hover:text-zinc-900 rounded-lg 
            ${
              border === 2 &&
              "text-black bg-gradient-to-r from-green-900 to-yellow-600 rounded-r-none"
            }
            `}
            onClick={() => setBorder(2)}
          >
            News & Alerts
          </button>
        </div>
      </Link>
      <Link to="/student/settings">
        <div className="h-10 mt-2 bg-green-900 rounded-lg">
          <button
            className={`h-10 w-full px-2 text-green-400 hover:bg-green-600 hover:text-zinc-900 rounded-lg 
            ${
              border === 3 &&
              "text-black bg-gradient-to-r from-green-900 to-yellow-600 rounded-r-none"
            }
            `}
            onClick={() => setBorder(3)}
          >
            Settings
          </button>
        </div>
      </Link>
      <div className="h-10 bg-green-900 rounded-lg"></div>
      <div className="h-10 bg-green-900 rounded-lg"></div>
      <div className="h-10 bg-green-900 rounded-lg"></div>
      <div className="h-10 bg-green-900 rounded-lg"></div>
    </div>
  );
};

export default Navbar3;
