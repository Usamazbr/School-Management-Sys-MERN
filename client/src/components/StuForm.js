import { useEffect, useState } from "react";

const apiUrl = `http://localhost:5005`;

const StuForm = (props) => {
  const [err, setErr] = useState(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [subs, setSubs] = useState("");
  const [teacher, setTeacher] = useState("");

  useEffect(() => {}, []);

  const stuSubmit = async (e) => {
    e.preventDefault();
    setErr(null);
    const subjects = subs.split(" ");
    const teachers = teacher.split(" ");
    let response;

    if (props.edit) {
      props.onSubmit({ username: name, age, subjects, teachers });
      console.log(props.edit.id);
      response = await fetch(apiUrl + `/api/students/` + props.edit.id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: name, age, subjects, teachers }),
      });
    } else {
      response = await fetch(apiUrl + `/api/students/data`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, age, subjects, teachers }),
      });
    }

    const json = await response.json();
    if (!response.ok) {
      console.log(json);
      setErr(json.err);
    }
    if (response.ok) {
      //   console.log(json);
    }
  };
  return (
    <div>
      <h2>Form</h2>

      <label>Name: </label>
      <input type="Name" onChange={(e) => setName(e.target.value)} />
      <br />

      <label>Age: </label>
      <input type="Age" onChange={(e) => setAge(e.target.value)} />
      <br />

      <label>Subs: </label>
      <input type="Subs" onChange={(e) => setSubs(e.target.value)} />
      <br />

      <label>Teacher: </label>
      <input type="Teacher" onChange={(e) => setTeacher(e.target.value)} />
      <br />

      <button onClick={stuSubmit}>Submit</button>
      {err && <div>{err}</div>}
    </div>
  );
};
export default StuForm;
