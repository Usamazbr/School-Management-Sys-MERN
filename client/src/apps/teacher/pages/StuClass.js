import StuDash from "../components/StuDash";

function StuClass() {
  return (
    <div className="mx-auto flex flex-col h-full w-full bg-neutral-700 shadow-lg shadow-neutral-500/50 rounded-xl">
      <h2 className="px-2 h-11 text-xl text-neutral-500 font-bold rounded-lg">
        Students' Details
      </h2>
      <StuDash />
    </div>
  );
}

export default StuClass;
