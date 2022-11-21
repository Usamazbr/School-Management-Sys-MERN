import { useEffect, useContext, useState } from "react";
import { StuContext } from "../context/StuContext";

const StuDash = () => {
  const { students, dispatch } = useContext(StuContext);
  const [group, setGroup] = useState([]);

  useEffect(() => {
    const apiUrl = `http://localhost:5005`;
    const dataFetch = async () => {
      const response = await fetch(apiUrl + "/api/students/data", {
        headers: { "Content-Type": "application/json" },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "DISPLAY", payload: json.data });
      }
    };
    dataFetch();
    // console.log(students);

    const classes = async () => {
      let arr = [];
      students?.map((student, index) => {
        arr[index] = student.period;
        // setGroup(...group, student.period);
      });
      arr = arr.flat();
      const s = new Set(arr);
      let it = s.values();
      arr = Array.from(it);
      console.log(arr);
      setGroup(() => arr);
      // return arr;
    };
    classes();
  }, [dispatch, setGroup]);

  return (
    <div className="h-140 table-fixed overflow-scroll scrollbar rounded-lg">
      <table>
        <tbody className="ml-6 mt-2 grid grid-cols-4 gap-6">
          {group &&
            // console.log(classes())
            group.map((class1, index) => (
              <tr key={index}>
                <td className="border border-black">
                  <p className="m-2 p-2 border rounded-xl">{class1}</p>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default StuDash;
