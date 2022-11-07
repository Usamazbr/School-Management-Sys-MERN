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
    <div>
      {props.studs &&
        props.studs.map((student) => (
          <div key={student._id} className="container">
            <h4>Name: </h4>
            <p>{student.username}</p>
            <h4>Age: </h4>
            <p>{student.age}</p>
            <div>
              <h4>Subjects: </h4>
              {student.subjects.map((sub, index) => (
                <p key={index}>{sub}</p>
              ))}
            </div>
            <div>
              <h4>Teachers: </h4>
              {student.teachers.map((teacher, index) => (
                <p key={index}>{teacher}</p>
              ))}
            </div>
            <button
              onClick={() => setEdit({ id: student._id, value: student })}
            >
              Edit
            </button>
            <button onClick={() => props.removeStu(student._id)}>Del</button>
          </div>
        ))}
    </div>
  );
};

export default StuDash;
