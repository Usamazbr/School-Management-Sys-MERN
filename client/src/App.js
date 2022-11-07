import { useEffect, useState } from "react";
import StuForm from "./components/StuForm";
import StuDash from "./components/StuDash";

function App() {
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
    <header className="App-header">
      <div className="App">
        <form>
          <div className="Forum">
            <h1>Student Forum</h1>
            <StuForm />
          </div>
          <div className="Dash">
            <h2>Details</h2>
            <StuDash studs={stu} removeStu={removeStu} updateStu={updateStu} />
          </div>
        </form>
      </div>
    </header>
  );
}

export default App;
