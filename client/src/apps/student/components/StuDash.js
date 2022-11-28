import { useEffect, useState } from "react";
import { useTeac } from "../context/TeacContext";
import { useMsg } from "../context/MsgContext";
// import { useVer } from "../../../context/VerContext";

const ResultSheet = () => {
  const [result, setResult] = useState([]);
  const { teacher } = useTeac();

  useEffect(() => {
    if (!result[0]) {
      setResult(teacher.results);
    }
  }, [result, teacher]);

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

const Messages = () => {
  const { msgnews } = useMsg();
  console.log(msgnews);
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col m-1 p-2 text-orange-100 bg-zinc-900 shadow-lg shadow-slate-500/50 mx-auto rounded-lg">
        <h1 className="mx-auto p-1 text-opacity-80 text-red-400 text-xl font-semibold">
          Alerts
        </h1>
        {msgnews ? (
          msgnews?.map(({ teac_name, subject, message, alertType }, i) => (
            <div key={i}>
              {alertType === 1 && (
                <div className={`flex flex-col p-1 border rounded-lg`}>
                  <p className="text-red-500">Sender: {teac_name}</p>
                  <p className="text-yellow-300">Subject: {subject}</p>
                  <p>{message}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className={`flex flex-col p-1 border rounded-lg`}>
            <p className="text-yellow-300">No Alerts</p>
          </div>
        )}
      </div>
      <div className="flex flex-col m-1 p-2 text-orange-100 bg-zinc-900 shadow-lg shadow-slate-500/50 mx-auto rounded-lg">
        <h1 className="mx-auto p-1 text-opacity-80 text-xl font-semibold">
          News
        </h1>
        {msgnews ? (
          msgnews?.map(({ teac_name, subject, message, alertType }, i) => (
            <div key={i}>
              {alertType === 2 && (
                <div className={`flex flex-col p-1 border rounded-lg`}>
                  <p className="text-red-500">Sender: {teac_name}</p>
                  <p className="text-yellow-300">Subject: {subject}</p>
                  <p>{message}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className={`flex flex-col p-1 border rounded-lg`}>
            <p className="text-yellow-300">No News</p>
          </div>
        )}
      </div>
    </div>
  );
};

const StuDash = () => {
  const { teacher } = useTeac();
  // const { user } = useVer();

  useEffect(() => {}, []);

  return (
    <div className="h-140 text-neutral-400 rounded-lg">
      <h1 className="m-2 p-2 text-xl font-serif font-medium h-1/12">News</h1>
      {teacher ? (
        <div className="flex flex-row p-1 rounded-lg">
          <div className="flex flex-col m-1 p-2 h-fit w-1/2 text-zinc-900 bg-neutral-400 rounded-lg">
            <Messages />
          </div>
          <div className="flex flex-col m-1 p-2 h-fit w-1/2 space-y-1 text-zinc-900 bg-neutral-400 rounded-lg">
            <h1 className="mx-auto p-1 text-opacity-80 text-xl font-semibold">
              Result Sheet
            </h1>
            <ResultSheet />
          </div>
        </div>
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
