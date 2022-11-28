import { createContext, useReducer, useContext } from "react";

export const MsgContext = createContext();

export const useMsg = () => {
  return useContext(MsgContext);
};

export const msgReducer = (state, action) => {
  switch (action.type) {
    case "DISPLAY":
      return { msgnews: action.payload };
    case "DELETE":
      return {
        msgnews: state.msgnews.filter((stu) => stu._id !== action.payload._id),
      };

    default:
      return state;
  }
};

export const MsgContextWrap = ({ children }) => {
  const [state, disp] = useReducer(msgReducer, { msgnews: null });

  return (
    <MsgContext.Provider value={{ ...state, disp }}>
      {children}
    </MsgContext.Provider>
  );
};
