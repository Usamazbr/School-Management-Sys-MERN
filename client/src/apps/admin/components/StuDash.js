import { useState } from "react";
import { useStu } from "../context/StuContext";
import { useVer } from "../../../context/VerContext";
// import TeacForm from "./TeacForm";
import StuForm from "./StuForm";

const StuDash = () => {
  const { students, disp } = useStu();
  const { user } = useVer();
  const [edit, setEdit] = useState({ id: null, value: [] });

  const deleteStu = async (id) => {
    const apiUrl = `http://localhost:5005`;
    const response = await fetch(apiUrl + "/api/students/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    if (response.ok) {
      disp({ type: "DELETE", payload: json.data });
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
        <StuForm edit={edit} onSubmit={editSubmit} />
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
      {students ? (
        <table>
          <thead>
            <tr>
              <th className="w-1/5">Picture</th>
              <th className="w-1/5">Name</th>
              <th className="w-1/5">Age</th>
              <th className="w-1/5">Subjects</th>
              <th className="w-1/5">Teachers</th>
              <th className="w-1/5">Email</th>
              <th className="w-1/5">Classes</th>
              <th className="w-1/5">Role</th>
              <th className="w-1/5">Phone</th>
              <th className="w-1/5">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students &&
              students.map((student) => (
                <tr key={student._id}>
                  {/* <div key={student._id} className="container"> */}
                  {/* <h4>Name: </h4> */}
                  <td>
                    <img
                      height={30}
                      width={60}
                      src={student.image}
                      className="p-1 rounded-t-lg"
                      alt="No img"
                    />
                  </td>
                  <td>
                    <p className="m-2 px-2 border">{student.username}</p>
                  </td>
                  {/* <h4>Age: </h4> */}
                  <td>
                    <p className="m-2 px-2 border">{student.age}</p>
                  </td>
                  <td>
                    {/* <h4>Subjects: </h4> */}
                    {student.subjects.map((sub, index) => (
                      <p key={index} className="m-2 px-2 border">
                        {sub}
                      </p>
                    ))}
                  </td>
                  <td>
                    {/* <h4>Teachers: </h4> */}
                    {student.teachers.map((teacher, index) => (
                      <p key={index} className="m-2 px-2 border">
                        {teacher}
                      </p>
                    ))}
                  </td>
                  <td>
                    {!student.email ? (
                      <p className="m-2 px-4 border">test email</p>
                    ) : (
                      <p className="m-2 px-1 border">{student.email}</p>
                    )}
                  </td>
                  <td>
                    {!student.period ? (
                      <p className="m-2 px-4 border">test class</p>
                    ) : (
                      student.period.map((sub, index) => (
                        <p key={index} className="m-2 px-2 border">
                          {sub}
                        </p>
                      ))
                    )}
                  </td>
                  <td>
                    {!student.role ? (
                      <p className="m-2 px-4 border">test role number</p>
                    ) : (
                      <p className="m-2 px-1 border">{student.role}</p>
                    )}
                  </td>
                  <td>
                    {!student.phone ? (
                      <p className="m-2 px-4 border">test phone</p>
                    ) : (
                      <p className="m-2 px-1 border">{student.phone}</p>
                    )}
                  </td>
                  <td className="flex flex-col">
                    <button
                      onClick={() =>
                        setEdit({ id: student._id, value: student })
                      }
                      className="mt-1 px-2 text-stone-900 bg-neutral-500 hover:bg-stone-300 border-2 border-transparent hover:border-neutral-700 hover:text-neutral-700 rounded-t-lg"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteStu(student._id)}
                      className="my-1 px-2.5 text-stone-900 bg-neutral-500 hover:bg-stone-300 border-2 border-transparent hover:border-neutral-700 hover:text-neutral-700 rounded-b-lg"
                    >
                      Del
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <div className="flex flex-row">
          <div className="border border-neutral-500 shadow rounded-md p-4 max-w-sm w-full mx-auto">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-neutral-500 h-10 w-10"></div>
              <div className="flex-1 space-y-6 py-1">
                <div className="h-2 bg-neutral-500 rounded"></div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-neutral-500 rounded col-span-2"></div>
                    <div className="h-2 bg-neutral-500 rounded col-span-1"></div>
                  </div>
                  <div className="h-2 bg-neutral-500 rounded"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col m-auto mt-20 w-64 h-64 bg-black bg-transparent rounded-lg">
            <h1 className="text-neutral-500 text-4xl animate-pulse">
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
