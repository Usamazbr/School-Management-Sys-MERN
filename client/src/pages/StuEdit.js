import { useEffect, useState, useRef } from "react";
import StuForm from "../components/StuForm";
import StuDash from "../components/StuDash";

function StuEdit() {
  const [stu, setStu] = useState();
  const ref1 = useRef(null);
  const [add, setAdd] = useState(true);
  const apiUrl = `http://localhost:5005`;

  const dataFetch = async () => {
    const response = await fetch(apiUrl + "/api/students/data", {
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();

    if (response.ok) {
      setStu(json.data);
    }
  };

  useEffect(() => {
    dataFetch();
    console.log(stu);
    // document.addEventListener("click", outClick);
  }, []);
  // useEffect(() => {
  //   console.log(add);

  //   return () => {};
  // }, [add]);

  const outClick = (e) => {
    if (!ref1.current.contains(e.target)) {
      console.log("clicked");
      setAdd(false);
    }
  };

  const removeStu = async (id) => {
    const response = await fetch(apiUrl + "/api/students/" + id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      console.log(json);
      const removedStu = [...stu].filter((stu) => stu._id !== id);

      setStu(removedStu);
    }
  };

  const updateStu = async (id, edit) => {
    console.log(id);
    console.log(edit);
    setStu((prev) =>
      prev.map((item) => (item._id === id ? (item = edit) : item))
    );
  };

  return (
    <div className="flex flex-row mt-2 p-2 h-160  mx-auto bg-stone-800 rounded-lg">
      <div className="h-24 w-1/6 p-2 space-y-2 rounded-lg">
        <div className="h-10 bg-stone-900 rounded-lg"></div>
        <div className="h-10 bg-stone-900 rounded-lg"></div>
        <div className="h-10 bg-stone-900 rounded-lg"></div>
        <div className="h-10 bg-stone-900 rounded-lg"></div>
        <div className="h-10 bg-stone-900 rounded-lg"></div>
        <div className="h-10 bg-stone-900 rounded-lg"></div>
        <div className="h-10 bg-stone-900 rounded-lg"></div>
      </div>
      <form className="relative w-5/6 mx-auto h-full border rounded-lg">
        <div
          // ref={ref1}
          className={`absolute right-0 mx-auto ml-2 w-56 p-3 bg-neutral-500 shadow-md shadow-neutral-500/50 rounded-lg ${
            !add ? "translate-x-0 " : "translate-x-full"
          }`}
        >
          <StuForm />
        </div>

        <div className="flex flex-col w-full">
          <div className="w-full h-1/12 rounded-lg">
            {add ? (
              <button
                type="button"
                onClick={() => {
                  setAdd(!add);
                }}
                className="m-2 px-2 bg-neutral-500 hover:bg-stone-300 border-2 border-transparent hover:border-neutral-700 hover:text-neutral-700 rounded-lg"
              >
                +
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setAdd(!add);
                }}
                className="m-2 px-2 bg-neutral-500 hover:bg-stone-300 border-2 border-transparent hover:border-neutral-700 hover:text-neutral-700 rounded-lg"
              >
                Cancel
              </button>
            )}
          </div>
          <div className="mx-auto h-11/12 w-full text-neutral-500 bg-transparent mt-4 rounded-t-lg">
            <h2 className="m-auto h-8 text-lg text-center">Details</h2>
            <StuDash studs={stu} removeStu={removeStu} updateStu={updateStu} />
          </div>
        </div>
      </form>
    </div>
  );
}

export default StuEdit;
