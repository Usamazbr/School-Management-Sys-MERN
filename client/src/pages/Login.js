import { useState } from "react";
import { useVer } from "../context/VerContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const [loadState, setLoadState] = useState(null);
  const { dispatch } = useVer();

  const apiUrl = `http://localhost:5005/api/user/login`;

  const login = async (email, password) => {
    setLoadState(true);
    setErr(null);

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();

    if (!response.ok) {
      console.log(json.err);
      setLoadState(false);
      setErr(json.err);
    }
    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      const startTime = new Date().getTime();
      localStorage.setItem("time", JSON.stringify(startTime));

      dispatch({ type: "LOGIN", payload: json });
      setLoadState(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <div className="flex flex-row h-150">
      <div className="w-3/4"></div>
      <form
        className="flex flex-col w-1/4 m-auto mr-4 p-5 bg-purple-900 text-slate-400 border-transparent border-slate-400 rounded-lg"
        onSubmit={handleSubmit}
      >
        <h3 className="m-2 text-xl font-bold text-slate-300">Log In</h3>

        <label className="mt-4 px-2">Email address:</label>
        <input
          className="m-1 mx-2 p-1 px-2 bg-gray-800 rounded-md"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label className="mt-4 px-2">Password:</label>
        <input
          className="m-1 mx-2 p-1 px-2 bg-gray-800 rounded-md"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <button
          className="m-auto mt-2 p-2 hover:bg-slate-400 hover:text-purple-900 rounded-xl"
          disabled={loadState}
        >
          Log in
        </button>
        {err && (
          <div className="error mx-auto mt-1 p-1 px-2 text-red-400 border border-red-400 rounded-xl">
            {err}
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
