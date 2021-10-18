  import { createContext, useContext, useReducer, useState } from "react";
import { userReducer } from "../Reducer/userReducer";
import axios from "axios";
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const initialUser = { name: "", username: "", email: "", password: "" };
export const AuthProvider = ({ children }) => {
  const [login, setLogin] = useState(localStorage.getItem("login") || false);
  const [userstate, userDispatch] = useReducer(userReducer, initialUser);
  const [userData, setUser] = useState(
    JSON.parse(localStorage.getItem("userData")) || {}
  );
  const [loader, setLoader] = useState(false);

  const userLogin = async (name, passcode) => {
    try {
      const { data } = await axios.post(
        "https://Youtube.snehaadlakha.repl.co/users/login",
        {
          username: name.toLowerCase(),
          password: passcode
        }
      );
      setLogin(true);
      localStorage.setItem("login", login);
      setUser(data.user);
      localStorage.setItem("userData", JSON.stringify(data.user));
      userDispatch({ type: "ERASE" });
      return data;
    } catch (err) {
      const errorResponse = JSON.stringify(err.response.data);
      console.error(errorResponse);
      return err.response.data;
    }
  };

  const userLogout = () => {
    setLogin(false);
    setUser("");
    localStorage.removeItem("login");
    localStorage.removeItem("userData");
  };

  const newRegistration = async (name, username, password, email) => {
    try {
      const { data } = await axios.post(
        "https://Youtube.snehaadlakha.repl.co/users/register",
        {
          name,
          username: username.toLowerCase(),
          password,
          email: email.toLowerCase()
        }
      );
      setLogin(true);
      localStorage.setItem("login", login);
      setUser(data.user);
      localStorage.setItem("userData", JSON.stringify(data.user));
      return data;
    } catch (err) {
      const errorResponse = JSON.stringify(err.response.data);
      console.error(errorResponse);
      return err.response.data;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        userLogin,
        userLogout,
        userstate,
        userDispatch,
        newRegistration,
        userData,
        loader,
        setLoader
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
