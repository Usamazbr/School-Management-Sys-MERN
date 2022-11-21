import { useEffect, useState } from "react";
import StuForm from "../components/StuForm";
import StuDash from "../components/StuDash";

function StuEdit() {
  const [add, setAdd] = useState(true);

  useEffect(() => {}, []);

  return (
    <div>
      <div
        // ref={ref1}
        className={`absolute right-0 mx-auto ml-2 w-56 p-3 bg-stone-900 shadow-md shadow-neutral-500/50 rounded-lg ease-in-out duration-300 ${
          !add ? "translate-x-0 " : "translate-x-full"
        }`}
      >
        <StuForm />
      </div>
      <div className="mx-auto h-full border rounded-lg">
        <div className="flex flex-col h-full w-full">
          <h2 className="px-2 h-8 text-xl text-neutral-500 font-bold">
            Students' Details
          </h2>
          <div className="w-full h-1/12 rounded-lg">
            {add ? (
              <button
                type="button"
                onClick={() => {
                  setAdd(!add);
                }}
                className="m-2 px-2 bg-neutral-500 hover:bg-stone-300 border-2 border-transparent hover:border-neutral-700 hover:text-neutral-700 ease-in-out duration-800 rounded-lg"
              >
                +
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setAdd(!add);
                }}
                className="m-2 px-2 bg-neutral-500 hover:bg-stone-300 border-2 border-transparent hover:border-neutral-700 hover:text-neutral-700 ease-in-out duration-800 rounded-lg"
              >
                Cancel
              </button>
            )}
          </div>
          <div className="mx-auto h-11/12 w-full text-neutral-500 bg-transparent mt-4 rounded-t-lg">
            <StuDash />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StuEdit;
