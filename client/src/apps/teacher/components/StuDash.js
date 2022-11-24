import { useEffect, useState } from "react";
import { useStu } from "../context/StuContext";

const StuDash = () => {
  const { students } = useStu();
  const [group, setGroup] = useState();
  const [enterSub, setEnterSub] = useState("");
  const [enterStu, setEnterStu] = useState("");

  useEffect(() => {
    // const classes = async () => {
    let arr = [];
    // console.log(students);
    students?.map((student, index) => {
      return (arr[index] = student.period);
      // setGroup(...group, student.period);
    });
    arr = arr.flat();
    const s = new Set(arr);
    let it = s.values();
    arr = Array.from(it);
    // console.log(arr);
    //   return arr;
    // };
    setGroup(() => arr);
    // console.log(group);
  }, [students]);

  if (enterStu) {
    return (
      <>
        <button
          onClick={() => setEnterStu("")}
          className="m-2 px-2 bg-neutral-500 hover:bg-stone-300 border-2 border-transparent hover:border-neutral-700 text-black hover:text-neutral-700 duration-800 shadow-lg shadow-neutral-600/50 transition duration-300 ease-in-out transform hover:scale-110 rounded-lg"
        >
          back
        </button>
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
              {enterStu.periods?.map((sub, i) => (
                <p className="px-1" key={i}>
                  {sub}
                </p>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  if (enterSub) {
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
      <>
        <button
          onClick={() => setEnterSub("")}
          className="m-2 px-2 bg-neutral-500 hover:bg-stone-300 border-2 border-transparent hover:border-neutral-700 text-black hover:text-neutral-700 ease-in-out duration-800 shadow-lg shadow-neutral-600/50 transition duration-300 transform hover:scale-110 rounded-lg"
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
        </div>
      </>
    );
  }

  return (
    <div className="h-140 text-neutral-400 table-fixed overflow-scroll scrollbar rounded-lg">
      <h1 className="m-2 p-2 text-xl font-serif font-medium h-1/12">Classes</h1>
      <table className="w-full h-11/12">
        <tbody className="ml-6 mt-2 grid grid-cols-4 gap-6 w-2/3">
          {group &&
            // console.log(classes())
            group?.map((class1, index) => (
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
    </div>
  );
};

export default StuDash;
