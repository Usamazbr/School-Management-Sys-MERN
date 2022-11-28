import StuDash from "../components/StuDash";

function StuNews() {
  return (
    <div className="mx-auto flex flex-col h-full w-full bg-green-700 shadow-lg shadow-green-500/50 rounded-xl">
      <h2 className="px-2 h-11 text-xl text-green-500 font-bold rounded-lg">
        News & Alerts
      </h2>
      <StuDash />
    </div>
  );
}

export default StuNews;
