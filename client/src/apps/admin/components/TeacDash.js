import { useEffect, useState } from "react";
import StuForm from "./StuForm";

const TeacDash = (props) => {
  const [edit, setEdit] = useState({ id: null, value: [] });

  useEffect(() => {
    console.log(props.studs);
  }, [props.studs]);

  const editSubmit = (e) => {
    props.updateStu(edit.id, e);
    setEdit({ id: null, value: [] });
  };

  if (edit.id) {
    return <StuForm edit={edit} onSubmit={editSubmit} />;
  }

  return (
    <div className="h-130 border-separate border-spacing-2 rounded-lg table-fixed overflow-scroll scrollbar">
      <table>
        <thead>
          <tr>
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
          {props.studs &&
            props.studs.map((student) => (
              <tr key={student._id}>
                {/* <div key={student._id} className="container"> */}
                {/* <h4>Name: </h4> */}
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
                    <p className="m-2 border">{student.email}</p>
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
                    <p className="m-2 border">{student.role}</p>
                  )}
                </td>
                <td>
                  {!student.phone ? (
                    <p className="m-2 px-4 border">test phone</p>
                  ) : (
                    <p className="m-2 border">{student.phone}</p>
                  )}
                </td>
                <td className="flex flex-col">
                  <button
                    onClick={() => setEdit({ id: student._id, value: student })}
                    className="mt-1 px-2 text-stone-900 bg-neutral-500 hover:bg-stone-300 border-2 border-transparent hover:border-neutral-700 hover:text-neutral-700 rounded-t-lg"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => props.removeStu(student._id)}
                    className="my-1 px-2.5 text-stone-900 bg-neutral-500 hover:bg-stone-300 border-2 border-transparent hover:border-neutral-700 hover:text-neutral-700 rounded-b-lg"
                  >
                    Del
                  </button>
                </td>
                {/* </div> */}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacDash;
