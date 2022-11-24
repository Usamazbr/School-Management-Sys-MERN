import { useState } from "react";
import { useTeac } from "../context/TeacContext";
import { useVer } from "../../../context/VerContext";

export default function Settings() {
  const { teacher } = useTeac();
  const { user } = useVer();
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [err, setErr] = useState(null);
  const apiUrl = `http://localhost:5005`;

  const reset = async (o, n) => {
    console.log(o, n);
    // console.log(props.edit.id);
    const response = await fetch(apiUrl + `/api/user/change`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ oldP: o, newP: n }),
    });

    const json = await response.json();
    if (response.ok) {
      console.log(json);
      setErr("");
    }
    if (!response.ok) {
      console.log(json);
      setErr(json.err);
    }
    setNewPass("");
    setOldPass("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await reset(oldPass, newPass);
  };

  const visiBle = () => {
    var x = document.getElementById("pass");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };
  const visiBle2 = () => {
    var x = document.getElementById("pass2");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };

  return (
    <div className="mx-auto flex flex-col h-full w-full bg-neutral-700 shadow-lg shadow-neutral-500/50 rounded-xl">
      <h2 className="px-2 m-2 h-8 text-xl text-neutral-500 font-bold rounded-lg">
        Settings
      </h2>
      <div className="flex flex-row h-full w-full text-neutral-500 mt-2 rounded-lg">
        <div className="m-2 rounded-lg">
          <div
            className={`flex flex-col mb-1 w-full p-5 bg-stone-800 text-slate-400 border-transparent border-slate-400 rounded-lg ${
              err ? "h-60" : "h-1/2"
            }`}
          >
            <h3 className="mb-2 text-lg font-semibold text-slate-300">
              General
            </h3>
            {teacher && (
              <>
                <p>Name: {teacher.username}</p>
                <p>Email: {teacher.email}</p>
                <div className="flex flex-row">
                  Classes:{" "}
                  {teacher.subjects?.map((sub, i) => (
                    <p className="px-1" key={i}>
                      {sub}
                    </p>
                  ))}
                </div>
              </>
            )}
          </div>
          <form
            className={`flex flex-col h-1/2 w-full p-5 bg-stone-900 text-slate-400 border-transparent border-slate-400 rounded-lg ${
              err ? "h-80" : "h-1/2"
            }`}
            onSubmit={handleSubmit}
          >
            <h3 className="mb-2 text-lg font-semibold text-slate-300">
              Change Password
            </h3>

            <label className="mt-4 px-2">Current password:</label>
            <div className="flex flex-row">
              <input
                id="pass"
                className="m-1 mx-2 p-1 px-2 w-11/12 text-white bg-stone-700 rounded-md"
                type="password"
                onChange={(e) => setOldPass(e.target.value)}
                value={oldPass}
              />
              <button
                type="button"
                className="w-1/12 rounded-lg"
                onClick={visiBle}
              >
                👁
              </button>
            </div>
            <label className="mt-4 px-2">New password:</label>
            <div className="flex flex-row">
              <input
                id="pass2"
                className="m-1 mx-2 p-1 px-2 w-11/12 text-white bg-stone-700 rounded-md"
                type="password"
                onChange={(e) => setNewPass(e.target.value)}
                value={newPass}
              />
              <button
                type="button"
                className="w-1/12 rounded-lg"
                onClick={visiBle2}
              >
                👁
              </button>
            </div>

            <button
              className="m-auto mt-2 p-2 hover:bg-slate-400 hover:text-purple-900 rounded-xl"
              // disabled={loadState}
            >
              Set
            </button>
            {err && (
              <div className="error mx-auto mt-1 p-1 px-2 text-red-400 border border-red-400 rounded-xl">
                {err}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
