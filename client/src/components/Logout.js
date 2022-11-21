import { useVer } from "../context/VerContext";

export const useLogout = () => {
  const { dispatch } = useVer();

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("time");

    // logout
    dispatch({ type: "LOGOUT" });
  };

  return { logout };
};
