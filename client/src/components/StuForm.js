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
    <div className="flex flex-col w-full text-stone-900">
      <h2 className="flex mx-auto text-xl">Add new student</h2>

      <label>
        Name:
        <input
          className="m-1"
          type="Name"
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        Age:
        <input
          className="m-1"
          type="Age"
          onChange={(e) => setAge(e.target.value)}
        />
      </label>

      <label>
        Subjects:
        <input
          className="m-1"
          type="Subs"
          onChange={(e) => setSubs(e.target.value)}
        />
      </label>

      <label>
        Teachers:
        <input
          className="m-1"
          type="Teacher"
          onChange={(e) => setTeacher(e.target.value)}
        />
      </label>

      <label>
        Email:
        <input
          className="m-1"
          type="Teacher"
          // onChange={(e) => setTeacher(e.target.value)}
        />
      </label>

      <label>
        Classes:
        <input
          className="m-1"
          type="Teacher"
          // onChange={(e) => setTeacher(e.target.value)}
        />
      </label>

      <label>
        Role no.:
        <input
          className="m-1"
          type="Teacher"
          // onChange={(e) => setTeacher(e.target.value)}
        />
      </label>

      <label>
        Phone:
        <input
          className="m-1"
          type="Teacher"
          // onChange={(e) => setTeacher(e.target.value)}
        />
      </label>

      <button
        onClick={stuSubmit}
        className="mx-auto p-2 bg-neutral-500 hover:bg-stone-300 border-2 border-transparent hover:border-neutral-700 hover:text-neutral-700 rounded-lg"
      >
        Submit
      </button>
      {err && <div>{err}</div>}
    </div>
  );
};
export default StuForm;
