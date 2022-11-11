import { useEffect, useState } from "react";
import StuForm from "../components/StuForm";
import StuDash from "../components/StuDash";

function StuEdit() {
  const [stu, setStu] = useState();
  // const stu = useRef()
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
  }, []);

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
    <div className="m-auto p-2 h-full border mx-auto bg-stone-800 rounded-lg">
      <form className="flex flex-row-reverse mx-auto w-full border rounded-lg">
        <div className="mx-auto ml-2 w-1/4 p-3 bg-neutral-500 shadow-md shadow-neutral-500/50 rounded-lg">
          <StuForm />
        </div>

        <div className="flex flex-col w-3/4 border">
          <div className="w-full border rounded-lg">
            {/* <div className="mx-auto w-1/2 p-3 bg-neutral-500 shadow-md shadow-neutral-500/50 rounded-lg">
              <StuForm />
            </div> */}
            <div className="h-40 w-1/2 p-2 space-y-2 overflow-y-scroll scrollbar rounded-lg">
              <div className="h-24 bg-stone-900"></div>
              <div className="h-24 bg-stone-900"></div>
              <div className="h-24 bg-stone-900"></div>
              <div className="h-24 bg-stone-900"></div>
              <div className="h-24 bg-stone-900"></div>
              <div className="h-24 bg-stone-900"></div>
            </div>
          </div>
          <div className="mx-auto w-full text-neutral-500 bg-transparent mt-4 border rounded-t-lg">
            <h2 className="m-auto text-lg text-center">Details</h2>
            <StuDash studs={stu} removeStu={removeStu} updateStu={updateStu} />
          </div>
        </div>
      </form>
      <div className="w-1/4"></div>
    </div>
  );
}

export default StuEdit;
