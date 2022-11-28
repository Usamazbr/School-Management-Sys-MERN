import { createContext, useReducer, useContext } from "react";

export const TeacContext = createContext();
export const useTeac = () => {
  return useContext(TeacContext);
};

export const teacReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return { teacher: action.payload };

    default:
      return state;
  }
};

export const TeacContextWrap3 = ({ children }) => {
  const [state, dispatch] = useReducer(teacReducer, { teacher: null });

  return (
    <TeacContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TeacContext.Provider>
  );
};
