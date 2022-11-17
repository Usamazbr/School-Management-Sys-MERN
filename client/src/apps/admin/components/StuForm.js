import { useEffect, useState, useContext } from "react";
import { StuContext } from "../context/StuContext";

const apiUrl = `http://localhost:5005`;

const StuForm = (props) => {
  const { dispatch } = useContext(StuContext);
  const [err, setErr] = useState(null);

  const [stuImg, setStuImg] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [subs, setSubs] = useState("");
  const [teacher, setTeacher] = useState("");
  const [email, setEmail] = useState("");
  const [periods, setPeriod] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  let json;

  useEffect(() => {}, []);

  const stuSubmit = async (e) => {
    e.preventDefault();
    setErr(null);
    const subjects = subs.split(" ");
    const teachers = teacher.split(" ");
    const period = periods.split(" ");
    let response;

    if (props.edit) {
      props.onSubmit({
        username: name,
        age,
        subjects,
        teachers,
        email,
        period,
        role,
        phone,
        image: stuImg,
      });
      // console.log(props.edit.id);
      response = await fetch(apiUrl + `/api/students/` + props.edit.id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: name,
          age,
          subjects,
          teachers,
          email,
          period,
          role,
          phone,
          image: stuImg,
        }),
      });

      json = await response.json();
      if (response.ok) {
        console.log(json.data);
        dispatch({ type: "UPDATE", payload: json.data });
      }
    } else {
      response = await fetch(apiUrl + `/api/students/data`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: name,
          age,
          subjects,
          teachers,
          email,
          period,
          role,
          phone,
          image: stuImg,
        }),
      });

      json = await response.json();
      if (response.ok) {
        console.log(json.data);
        dispatch({ type: "CREATE", payload: json.data });
        setErr(null);
        setName("");
        setAge("");
        setSubs("");
        setTeacher("");
        setEmail("");
        setPeriod("");
        setRole("");
        setPhone("");
        setStuImg("");
      }
    }

    if (!response.ok) {
      console.log(json);
      setErr(json.err);
    }
  };

  const fileSelect = (e) => {
    const file = e.target.files[0];
    console.log(file.name);
    const fileRead = new FileReader();
    fileRead.readAsDataURL(file);
    fileRead.onload = () => setStuImg(fileRead.result);
  };

  return (
    <form
      onSubmit={stuSubmit}
      className="flex flex-col w-full text-neutral-500"
    >
      <h2 className="flex mx-auto text-xl">Add new Student</h2>

      <label>
        Picture:
        <input
          // style={{ display: "none" }}
          type="file"
          className="m-1 shadow-inner"
          onChange={fileSelect}
        />
      </label>

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
        Age:
        <input
          value={age}
          className="m-1"
          type="number"
          onChange={(e) => setAge(e.target.value)}
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
        Teachers:
        <input
          value={teacher}
          className="m-1"
          type="text"
          onChange={(e) => setTeacher(e.target.value)}
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

      <label>
        Role no.:
        <input
          value={role}
          className="m-1"
          type="number"
          onChange={(e) => setRole(e.target.value)}
        />
      </label>

      <label>
        Phone:
        <input
          value={phone}
          className="m-1"
          type="number"
          onChange={(e) => setPhone(e.target.value)}
        />
      </label>

      <button
        // onClick={stuSubmit}
        className="mx-auto p-2 bg-stone-900 hover:bg-stone-300 border-2 border-transparent hover:border-neutral-700 hover:text-neutral-700 rounded-lg"
      >
        Submit
      </button>
      {err && <div>{err}</div>}
    </form>
  );
};
export default StuForm;
