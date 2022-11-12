import { useEffect, useState } from "react";
import StuForm from "./StuForm";

const StuDash = (props) => {
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
    <div className="h-130 border-separate border-spacing-4 rounded-lg table-fixed overflow-y-scroll scrollbar">
      <table>
        <thead>
          <tr>
            <th className="w-1/4">Name</th>
            <th className="w-1/4">Age</th>
            <th className="w-1/4">Subjects</th>
            <th className="w-1/4">Teachers</th>
            <th className="w-1/4">Email</th>
            <th className="w-1/4">Classes</th>
            <th className="w-1/4">Role</th>
            <th className="w-1/4">Phone</th>
            <th className="w-1/4">Actions</th>
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
                  <p className="m-2 px-4 border">test</p>
                </td>
                <td>
                  <p className="m-2 px-4 border">test</p>
                </td>
                <td>
                  <p className="m-2 px-4 border">test</p>
                </td>
                <td>
                  <p className="m-2 px-4 border">test</p>
                </td>
                <td className="">
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

export default StuDash;
