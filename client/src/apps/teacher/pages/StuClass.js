import { useEffect } from "react";
import StuDash from "../components/StuDash";

function StuClass() {
  useEffect(() => {}, []);

  return (
    <div className="mx-auto flex flex-col h-full w-full bg-neutral-700 border rounded-lg">
      <h2 className="px-2 h-1/12 text-xl text-neutral-500 font-bold">
        Students' Details
      </h2>
      <div className="mx-auto h-11/12 w-full text-neutral-500 mt-4 rounded-t-lg">
        <StuDash />
      </div>
    </div>
  );
}

export default StuClass;
