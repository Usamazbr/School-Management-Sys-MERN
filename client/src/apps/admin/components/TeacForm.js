import { useEffect, useState, useContext } from "react";
import { TeacContext } from "../context/TeacContext";
import { useVer } from "../../../context/VerContext";

const apiUrl = `http://localhost:5005`;

const TeacForm = (props) => {
  const { dispatch } = useContext(TeacContext);
  const { user } = useVer();
  const [err, setErr] = useState(null);

  const [name, setName] = useState("");
  const [subs, setSubs] = useState("");
  const [email, setEmail] = useState("");
  const [periods, setPeriod] = useState("");
  let json;

  useEffect(() => {}, []);

  const stuSubmit = async (e) => {
    e.preventDefault();
    setErr(null);
    const subjects = subs.split(" ");
    const period = periods.split(" ");
    let response;

    if (props.edit) {
      props.onSubmit({
        username: name,
        subjects,
        email,
        period,
      });
      // console.log(props.edit.id);
      response = await fetch(apiUrl + `/api/teachers/` + props.edit.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          username: name,
          subjects,
          email,
          period,
        }),
      });

      json = await response.json();
      if (response.ok) {
        console.log(json.data);
        dispatch({ type: "UPDATE", payload: json.data });
      }
    } else {
      console.log(
        JSON.stringify({
          user,
          username: name,
          subjects,
          email,
          period,
        })
      );
      response = await fetch(apiUrl + `/api/teachers/data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          user,
          username: name,
          subjects,
          email,
          period,
        }),
      });

      json = await response.json();
      if (response.ok) {
        console.log(json.data);
        dispatch({ type: "CREATE", payload: json.data });
        setErr(null);
        setName("");
        setSubs("");
        setEmail("");
        setPeriod("");
      }
    }

    if (!response.ok) {
      console.log(json.err);
      setErr(json.err);
    }
  };

  return (
    <form
      onSubmit={stuSubmit}
      className="flex flex-col w-full text-neutral-500"
    >
      <h2 className="flex mx-auto text-xl">Add new Teacher</h2>

      <label>
        Name:
        <input
          value={name}
          className="m-1"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        Subjects:
        <input
          value={subs}
          className="m-1"
          type="text"
          onChange={(e) => setSubs(e.target.value)}
        />
      </label>

      <label>
        Email:
        <input
          value={email}
          className="m-1"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <label>
        Classes:
        <input
          value={periods}
          className="m-1"
          type="text"
          onChange={(e) => setPeriod(e.target.value)}
        />
      </label>

      <button
        // onClick={stuSubmit}
        className="mx-auto p-2 bg-stone-900 hover:bg-stone-300 border-2 border-transparent hover:border-neutral-700 hover:text-neutral-700 rounded-lg"
      >
        Submit
      </button>
      {err && (
        <div className="error mx-auto mt-1 p-1 px-2 text-red-400 border border-red-400 rounded-xl">
          {err}
        </div>
      )}
    </form>
  );
};
export default TeacForm;
