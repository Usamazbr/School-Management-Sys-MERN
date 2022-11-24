import { createContext, useReducer, useContext } from "react";

export const StuContext = createContext();

export const useStu = () => {
  return useContext(StuContext);
};

export const stuReducer = (state, action) => {
  switch (action.type) {
    case "DISPLAY":
      return { students: action.payload };
    case "CREATE":
      return { students: [...state.students, action.payload] };
    case "DELETE":
      return {
        students: state.students.filter(
          (stu) => stu._id !== action.payload._id
        ),
      };
    case "UPDATE":
      return {
        students: state.students.map((stu) => {
          if (stu._id === action.payload._id) {
            return action.payload;
          } else {
            return stu;
          }
        }),
      };

    default:
      return state;
  }
};

export const StuContextWrap2 = ({ children }) => {
  const [state, disp] = useReducer(stuReducer, { students: null });

  return (
    <StuContext.Provider value={{ ...state, disp }}>
      {children}
    </StuContext.Provider>
  );
};
