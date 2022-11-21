import { createContext, useReducer } from "react";

export const TeacContext = createContext();

export const teacReducer = (state, action) => {
  switch (action.type) {
    case "DISPLAY":
      return { teachers: action.payload };
    case "CREATE":
      return { teachers: [...state.teachers, action.payload] };
    case "DELETE":
      return {
        teachers: state.teachers.filter(
          (teac) => teac._id !== action.payload._id
        ),
      };
    case "UPDATE":
      return {
        teachers: state.teachers.map((teac) => {
          if (teac._id === action.payload._id) {
            return action.payload;
          } else {
            return teac;
          }
        }),
      };

    default:
      return state;
  }
};

export const TeacContextWrap = ({ children }) => {
  const [state, dispatch] = useReducer(teacReducer, { teachers: null });

  return (
    <TeacContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TeacContext.Provider>
  );
};
