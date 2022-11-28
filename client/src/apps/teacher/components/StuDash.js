import { useEffect, useState, useRef } from "react";
import { useStu } from "../context/StuContext";
import { useTeac } from "../context/TeacContext";
import { useVer } from "../../../context/VerContext";

const StuDash = () => {
  const { students } = useStu();
  const { teacher } = useTeac();
  const { user } = useVer();
  const [group, setGroup] = useState();
  const [enterSub, setEnterSub] = useState("");
  const [enterStu, setEnterStu] = useState("");
  const [edit, setEdit] = useState(false);
  // const [subj, setSubj] = useState("");
  // const [text, setText] = useState("");
  // const [alertType, setAlertType] = useState();
  const [err, setErr] = useState("");
  const text = useRef();
  const subj = useRef();

  const [result, setResult] = useState([]);

  useEffect(() => {
    let arr = [];

    students?.map((student, index) => {
      return (arr[index] = student.period);
    });
    setResult([]);

    arr = arr.flat();
    const s = new Set(arr);
    let it = s.values();
    arr = Array.from(it);

    setGroup(() => arr);
  }, [students]);

  const AlertSys = ({ entity }) => {
    useEffect(() => {}, []);
    let alertType = 1;

    const onSubmit = async (e) => {
      e.preventDefault();
      const stuIds = entity?.map((s) => s._id);
      const stuEms = entity?.map((s) => s.email);

      console.log(text.current.value, subj.current.value);
      console.log(alertType);
      console.log(stuIds);
      const apiUrl = `http://localhost:5005`;

      const response = await fetch(apiUrl + `/api/students/msg`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          subject: subj.current.value,
          message: text.current.value,
          recievers: stuIds,
          alertType,
          stuEms,
        }),
      });
      const json = await response.json();
      if (response.ok) {
        console.log(json.data);
        setErr("");
      }

      if (!response.ok) {
        console.log(json);
        setErr(json.err);
      }
    };

    return (
      <div className="flex flex-col m-auto mt-1 p-2 h-fit w-fit space-y-1 text-zinc-900 bg-neutral-400 rounded-lg">
        <h1 className="mx-auto p-1 text-opacity-80 text-xl font-semibold">
          Alerts and News
        </h1>
        <div className="flex flex-col p-2 w-full text-orange-100 bg-zinc-900 shadow-lg shadow-slate-500/50 mx-auto rounded-lg">
          <form onSubmit={onSubmit}>
            <input
              type="text"
              ref={subj}
              className="p-1  w-full mb-1 caret-blue-700 cursor-text bg-neutral-500 rounded-lg"
            />
            <textarea
              type="text"
              ref={text}
              className="p-1 h-40 w-full caret-blue-700 cursor-text bg-neutral-500 rounded-lg"
            />
            <div className="flex flex-row">
              <button
                onClick={() => {
                  alertType = 1;
                }}
                className="m-2 px-2 bg-neutral-500 hover:bg-stone-300 border-2 border-transparent hover:border-neutral-700 text-black hover:text-neutral-700 duration-800 shadow-lg shadow-neutral-600/50 transition duration-300 ease-in-out transform hover:scale-110 rounded-lg"
              >
                Send Alert
              </button>
              <button
                onClick={() => {
                  alertType = 2;
                }}
                className="m-2 px-2 bg-neutral-500 hover:bg-stone-300 border-2 border-transparent hover:border-neutral-700 text-black hover:text-neutral-700 duration-800 shadow-lg shadow-neutral-600/50 transition duration-300 ease-in-out transform hover:scale-110 rounded-lg"
              >
                Send News
              </button>
              <button
                onClick={() => {
                  alertType = 3;
                }}
                className="m-2 px-2 bg-neutral-500 hover:bg-stone-300 border-2 border-transparent hover:border-neutral-700 text-black hover:text-neutral-700 duration-800 shadow-lg shadow-neutral-600/50 transition duration-300 ease-in-out transform hover:scale-110 rounded-lg"
              >
                Send Email
              </button>
            </div>
            {err && <p className="text-sm text-red-600 rounded-lg">{err}</p>}
          </form>
        </div>
      </div>
    );
  };

  if (enterStu) {
    const editable = enterStu.period.filter((e) => teacher.period.includes(e));

    // console.log(enterStu.results);
    let stuarr = [];
    stuarr.push(enterStu);

    const ResultSheet = () => {
      useEffect(() => {
        if (!result[0]) {
          setResult(enterStu.results);
        }
      }, []);

      if (edit) {
        let Temparr = [];
        const setarray = (e, i) => {
          const { value, id } = e.target;
          // console.log(id, value, i);
          let newState = [...Temparr];
          newState[i] = { ...newState[i], [id]: value };
          Temparr = newState;
        };
        const saveD = async (e) => {
          e.preventDefault();
          const prev = result;
          let updated = [];
          Temparr.map((obj) => {
            for (var key in obj) {
              updated = [...updated, { classname: key, finals: obj[key] }];
            }
            return obj;
          });

          setResult([]);
          let merged = [];
          let tempa;
          for (let i = 0; i < prev.length; i++) {
            tempa = updated.find(
              (itmInner) => itmInner.classname === prev[i].classname
            );
            merged.push({
              ...prev[i],
              ...tempa,
            });
          }
          if (!tempa) {
            merged = [...prev, ...updated];
          }

          console.log(merged);

          const apiUrl = `http://localhost:5005`;
          const response = await fetch(
            apiUrl + `/api/students/result/` + enterStu._id,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${user.token}`,
              },
              body: JSON.stringify(merged),
            }
          );
          const json = await response.json();

          if (response.ok) {
            setResult(merged);
            setEdit(false);
          }
          if (!response.ok) {
            setEdit(false);
            console.log(json);
          }
        };
        return (
          <div className="flex flex-col p-1 bg-orange-100 text-zinc-900 shadow-lg shadow-slate-500/50 mx-auto rounded-lg">
            {enterStu.period?.map((sub, i) => (
              <div className="flex flex-row relative" key={i}>
                <p>{`${sub}: `}</p>
                {Array.from(Array(56 - sub.length)).map((e, j) => (
                  <p key={j}>_</p>
                ))}
                <div className="w-9" />
                {editable.indexOf(sub) > -1 ? (
                  <div className="flex flex-row absolute right-0">
                    <input
                      className="w-6 h-4 px-1 text-orange-100 bg-black rounded-lg"
                      type="number"
                      // max="50"
                      id={sub}
                      // value={temp[0]}
                      onChange={(e) => setarray(e, i)}
                    />
                    <p>/50</p>
                  </div>
                ) : (
                  <div className="flex flex-row absolute right-0">
                    {/* <p id={sub}>32</p> */}
                    <p>/50</p>
                  </div>
                )}
              </div>
            ))}
            <button
              className="right-0 m-2 px-2 bg-orange-50 hover:bg-neutral-500 hover:text-orange-100 border-2 border-transparent text-black duration-800 shadow-lg shadow-neutral-600/50 transition duration-300 ease-in-out transform rounded-lg"
              onClick={saveD}
            >
              Submit
            </button>
          </div>
        );
      }
      return (
        <div className="flex flex-col p-2 text-orange-100 bg-zinc-900 shadow-lg shadow-slate-500/50 mx-auto rounded-lg">
          {result?.map(({ classname, finals }, i) => (
            <div key={i} className="flex flex-row relative">
              <p>{`${classname}: `}</p>
              {Array.from(Array(56 - classname.length)).map((e, j) => (
                <p key={j}>_</p>
              ))}
              <div className="w-9" />
              <div className="flex flex-row absolute right-0">
                <p>{finals}</p>
                <p>/50</p>
              </div>
            </div>
          ))}
        </div>
      );
    };

    return (
      <div className="h-full w-full text-neutral-500 mt-4 rounded-lg">
        <div className="flex flex-row relative h-11 w-full rounded-lg">
          <button
            onClick={() => {
              setEnterStu("");
              setResult([]);
              setEdit(false);
            }}
            className="absolute left-0 m-2 px-2 bg-neutral-500 hover:bg-stone-300 border-2 border-transparent hover:border-neutral-700 text-black hover:text-neutral-700 duration-800 shadow-lg shadow-neutral-600/50 transition duration-300 ease-in-out transform hover:scale-110 rounded-lg"
          >
            back
          </button>
          {!edit ? (
            <button
              onClick={() => setEdit(!edit)}
              className="absolute right-0 m-2 px-2 bg-neutral-500 hover:bg-stone-300 border-2 border-transparent hover:border-neutral-700 text-black hover:text-neutral-700 duration-800 shadow-lg shadow-neutral-600/50 transition duration-300 ease-in-out transform hover:scale-110 rounded-lg"
            >
              edit
            </button>
          ) : (
            <button
              onClick={() => {
                setEdit(!edit);
                setResult([]);
              }}
              className="absolute right-0 m-2 px-2 bg-neutral-500 hover:bg-stone-300 border-2 border-transparent hover:border-neutral-700 text-black hover:text-neutral-700 duration-800 shadow-lg shadow-neutral-600/50 transition duration-300 ease-in-out transform hover:scale-110 rounded-lg"
            >
              Cancel
            </button>
          )}
        </div>
        <div className="flex flex-row-reverse m-auto h-full w-full">
          <div className="flex flex-col h-full w-1/2 mr-1 rounded-lg">
            <div className="flex flex-col m-0 p-2 h-fit w-fit space-y-1 text-zinc-900 bg-neutral-400 rounded-lg">
              <h1 className="mx-auto p-1 text-opacity-80 text-xl font-semibold">
                Result Sheet
              </h1>
              <ResultSheet />
            </div>
            <AlertSys entity={stuarr} />
          </div>
          <div className="w-1/6"></div>
          <div className="flex flex-col m-2 p-2 h-fit w-1/3 space-y-1 bg-neutral-400 rounded-lg">
            <img
              height={60}
              width={120}
              src={enterStu.image}
              className="p-1 mb-4 shadow-lg shadow-slate-500/50 transition duration-300 ease-in-out transform hover:scale-150 hover:translate-x-6 hover:p-0 rounded-lg"
              alt="No img"
            />
            <div className="p-2 text-orange-100 bg-zinc-900 shadow-lg shadow-slate-500/50 rounded-lg">
              <h2 className="text-opacity-80 text-lg font-semibold">
                {enterStu.username}
              </h2>
              <p>Age: {enterStu.age}</p>
              <p>Email: {enterStu.email}</p>
              <p>Rolenumber: {enterStu.role}</p>
              <p>Phone: 0{enterStu.phone}</p>
            </div>
            <div className="p-2 text-orange-100 bg-zinc-900 shadow-lg shadow-slate-500/50 rounded-lg">
              <div className="flex flex-row">
                Subjects:{" "}
                {enterStu.subjects?.map((sub, i) => (
                  <p className="px-1" key={i}>
                    {sub}
                  </p>
                ))}
              </div>
              <div className="flex flex-row">
                Teachers:{" "}
                {enterStu.teachers?.map((sub, i) => (
                  <p className="px-1" key={i}>
                    {sub}
                  </p>
                ))}
              </div>
              <div className="flex flex-row">
                Classes:{" "}
                {enterStu.period?.map((sub, i) => (
                  <p className="px-1" key={i}>
                    {sub}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (enterSub) {
    let stuarr = students?.map((s) => {
      if (s.period.includes(enterSub)) {
        return s;
      } else {
        return null;
      }
    });
    stuarr = stuarr.filter((e) => e != null);

    const LoadStu = () => {
      return students?.map(
        (student, i) =>
          student.period.includes(enterSub) && (
            <button key={i} onClick={() => setEnterStu(student)}>
              <img
                height={30}
                width={60}
                src={student.image}
                className="p-1 shadow-lg shadow-slate-500/50 transition duration-300 ease-in-out transform hover:scale-125 rounded-lg"
                alt="No img"
              />
            </button>
          )
      );
    };
    return (
      <div className="relative">
        <button
          onClick={() => setEnterSub("")}
          className="absolute left-0 m-2 px-2 bg-neutral-500 hover:bg-stone-300 border-2 border-transparent hover:border-neutral-700 text-black hover:text-neutral-700 duration-800 shadow-lg shadow-neutral-600/50 transition duration-300 ease-in-out transform hover:scale-110 rounded-lg"
        >
          back
        </button>
        <div className="flex flex-col h-full">
          <p className="mx-auto p-2 h-1/12 text-orange-100 hover:text-green-400 bg-blue-900 shadow-sm shadow-neutral-500/50 rounded-lg">
            Welcome to {enterSub} class
          </p>
          <div className="mx-auto p-2 mt-2 h-11/12 grid grid-cols-4 gap-20 bg-orange-100 border border-orange-100 rounded-lg">
            <LoadStu />
          </div>
          <AlertSys entity={stuarr} />
        </div>
      </div>
    );
  }

  return (
    <div className="h-140 text-neutral-400 table-fixed overflow-scroll scrollbar rounded-lg">
      <h1 className="m-2 p-2 text-xl font-serif font-medium h-1/12">Classes</h1>
      {students ? (
        <table className="w-full h-11/12">
          <tbody className="ml-6 mt-2 grid grid-cols-4 gap-6 w-2/3">
            {group?.map((class1, index) => (
              <tr key={index}>
                <td className="">
                  <button
                    className="m-2 p-2 border hover:border-green-400 hover:text-green-400 hover:font-semibold transition duration-300 ease-in-out transform hover:scale-110 rounded-xl"
                    onClick={() => setEnterSub(class1)}
                  >
                    {class1}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="flex flex-row">
          <div className="border border-neutral-400 shadow rounded-md p-4 max-w-sm w-full mx-auto">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-neutral-400 h-10 w-10"></div>
              <div className="flex-1 space-y-6 py-1">
                <div className="h-2 bg-neutral-400 rounded"></div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-neutral-400 rounded col-span-2"></div>
                    <div className="h-2 bg-neutral-400 rounded col-span-1"></div>
                  </div>
                  <div className="h-2 bg-neutral-400 rounded"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col m-auto mt-20 w-64 h-64 bg-black bg-transparent rounded-lg">
            <h1 className="text-neutral-400 text-4xl animate-pulse">
              Loading...
            </h1>
            <svg className="animate-spin h-56 w-56" viewBox="0 0 24 24"></svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default StuDash;
