import { useState } from "react";
import { useStu } from "../context/StuContext";
import { useTeac } from "../context/TeacContext";
import { useVer } from "../../../context/VerContext";

const apiUrl = `http://localhost:5005`;

const StuForm = (props) => {
  const { disp } = useStu();
  const { teachers } = useTeac();
  const { user } = useVer();
  const [err, setErr] = useState(null);

  const [stuImg, setStuImg] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [subs, setSubs] = useState("");
  const [teacher, setTeacher] = useState([]);
  // const [teac_id, setTeac_id] = useState([]);
  const [email, setEmail] = useState("");
  const [periods, setPeriod] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  let json;

  const stuSubmit = async (e) => {
    e.preventDefault();
    setErr(null);
    // console.log(teachers);
    const arr = teacher.map((teach) =>
      teachers.filter((teac) => teac.username === teach)
    );
    // setTeac_id(() => arr.map((a) => a[0]._id));
    const teac_id = arr.map((a) => a[0]._id);
    console.log(teac_id);
    const subjects = subs.split(" ");
    // const teachers = teacher;
    const period = periods.split(" ");
    let response;

    if (props.edit) {
      props.onSubmit({
        username: name,
        age,
        subjects,
        teachers: teacher,
        email,
        period,
        role,
        phone,
        image: stuImg,
      });
      // console.log(props.edit.id);
      response = await fetch(apiUrl + `/api/students/` + props.edit.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          username: name,
          age,
          subjects,
          teachers: teacher,
          email,
          period,
          role,
          phone,
          image: stuImg,
          teac_id,
        }),
      });

      json = await response.json();
      if (response.ok) {
        console.log(json.data);
        disp({ type: "UPDATE", payload: json.data });
      }
    } else {
      response = await fetch(apiUrl + `/api/students/data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          user,
          username: name,
          age,
          subjects,
          teachers: teacher,
          email,
          period,
          role,
          phone,
          image: stuImg,
          teac_id,
        }),
      });

      json = await response.json();
      if (response.ok) {
        console.log(json.data);
        disp({ type: "CREATE", payload: json.data });
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
      <h2 className="flex mx-auto px-1 text-xl border border-neutral-500 rounded-lg">
        Add new Student
      </h2>

      <label>
        Picture:
        <input
          // style={{ display: "none" }}
          type="file"
          className="m-1 shadow-inner bg-black rounded-lg"
          onChange={fileSelect}
        />
      </label>

      <label>
        Name:
        <input
          value={name}
          className="my-1 px-1 bg-black rounded-lg"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        Age:
        <input
          value={age}
          className="my-1 px-1 bg-black rounded-lg"
          type="number"
          onChange={(e) => setAge(e.target.value)}
        />
      </label>

      <label>
        Subjects:
        <input
          value={subs}
          className="my-1 px-1 bg-black rounded-lg"
          type="text"
          onChange={(e) => setSubs(e.target.value)}
        />
      </label>

      <label>
        Teachers:
        {teacher &&
          teacher.map((teac, i) => (
            <div key={i} className="flex flex-row">
              <p className="w-1/2">{teac}</p>
              <button
                type="button"
                className="mx-auto w-6 hover:bg-stone-300 hover:border-neutral-700 hover:text-neutral-700 rounded-full"
                onClick={() =>
                  setTeacher((prev) =>
                    [...prev].filter((teach) => teach !== teac)
                  )
                }
              >
                x
              </button>
            </div>
          ))}
      </label>
      <select
        id="teachers"
        name="mems"
        className="m-1 w-44 bg-black rounded-lg"
        onChange={(e) => {
          setTeacher((prev) => [...prev, e.target.value]);
          // const dD = document.getElementById("teachers");
          // dD.selectedIndex = 0;
        }}
      >
        <option>select</option>
        {teachers &&
          teachers.map((teac, i) => <option key={i}>{teac.username}</option>)}
      </select>

      <label>
        Email:
        <input
          value={email}
          className="my-1 px-1 bg-black rounded-lg"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <label>
        Classes:
        <input
          value={periods}
          className="my-1 px-1 bg-black rounded-lg"
          type="text"
          onChange={(e) => setPeriod(e.target.value)}
        />
      </label>

      <label>
        Role no.:
        <input
          value={role}
          className="my-1 px-1 bg-black rounded-lg"
          type="number"
          onChange={(e) => setRole(e.target.value)}
        />
      </label>

      <label>
        Phone:
        <input
          value={phone}
          className="my-1 px-1 bg-black rounded-lg"
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
