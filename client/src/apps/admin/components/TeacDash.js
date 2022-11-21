import { useEffect, useState, useContext } from "react";
import { TeacContext } from "../context/TeacContext";
import { useVer } from "../../../context/VerContext";
// import { StuContext } from "../context/StuContext";
import TeacForm from "./TeacForm";
// import StuForm from "./StuForm";

const TeacDash = () => {
  const { teachers, dispatch } = useContext(TeacContext);
  const { user } = useVer();
  const [edit, setEdit] = useState({ id: null, value: [] });

  useEffect(() => {
    const apiUrl = `http://localhost:5005`;
    const dataFetch = async () => {
      const response = await fetch(apiUrl + "/api/teachers/data", {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "DISPLAY", payload: json.data });
      }
    };
    dataFetch();

    // console.log(students);
  }, [dispatch, user]);

  const deleteStu = async (id) => {
    const apiUrl = `http://localhost:5005`;
    const response = await fetch(apiUrl + "/api/teachers/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE", payload: json.data });
      console.log(json.data);
    }
  };
  //   if (!user) {
  //     return;
  //   }

  const editSubmit = (e) => {
    setEdit({ id: null, value: [] });
  };

  if (edit.id) {
    return (
      <>
        <TeacForm edit={edit} onSubmit={editSubmit} />
        <button
          type="button"
          onClick={() => {
            setEdit({ id: null, value: [] });
          }}
          className="m-2 px-2 bg-neutral-500 hover:bg-stone-300 border-2 border-transparent hover:border-neutral-700 text-black hover:text-neutral-700 ease-in-out duration-800 rounded-lg"
        >
          Cancel
        </button>
      </>
    );
  }

  return (
    <div className="h-130 border-separate border-spacing-2 rounded-lg table-fixed overflow-scroll scrollbar">
      <table>
        <thead>
          <tr>
            <th className="w-1/5">Name</th>
            <th className="w-1/5">Subjects</th>
            <th className="w-1/5">Email</th>
            <th className="w-1/5">Classes</th>
            <th className="w-1/5">Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers &&
            teachers.map((teacher) => (
              <tr key={teacher._id}>
                <td>
                  <p className="m-2 px-2 border">{teacher.username}</p>
                </td>
                <td>
                  {teacher.subjects.map((sub, index) => (
                    <p key={index} className="m-2 px-2 border">
                      {sub}
                    </p>
                  ))}
                </td>
                <td>
                  {!teacher.email ? (
                    <p className="m-2 px-4 border">test email</p>
                  ) : (
                    <p className="m-2 px-2 border">{teacher.email}</p>
                  )}
                </td>
                <td>
                  {!teacher.period ? (
                    <p className="m-2 px-4 border">test class</p>
                  ) : (
                    teacher.period.map((sub, index) => (
                      <p key={index} className="m-2 px-2 border">
                        {sub}
                      </p>
                    ))
                  )}
                </td>
                <td className="flex flex-col mx-auto w-16">
                  <button
                    onClick={() => setEdit({ id: teacher._id, value: teacher })}
                    className="mt-1 px-2 text-stone-900 bg-neutral-500 hover:bg-stone-300 border-2 border-transparent hover:border-neutral-700 hover:text-neutral-700 rounded-t-lg"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteStu(teacher._id)}
                    className="my-1 px-2.5 text-stone-900 bg-neutral-500 hover:bg-stone-300 border-2 border-transparent hover:border-neutral-700 hover:text-neutral-700 rounded-b-lg"
                  >
                    Del
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacDash;
