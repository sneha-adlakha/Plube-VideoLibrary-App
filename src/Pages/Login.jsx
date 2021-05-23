import { useAuth } from "../Context/AuthContext";
import Loader from "react-loader-spinner";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Login.css";
export const Login = () => {
  const [error, setError] = useState("");
  const {
    userLogin,
    userDispatch,
    userstate: { username, password },
    loader,
    setLoader
  } = useAuth();
  const { state } = useLocation();
  const navigate = useNavigate();
  const formSubmit = async (event) => {
    setLoader(true);
    event.preventDefault();
    if (!event.target.checkValidity()) {
      event.target.classList.add("was-validated");
    }
    const response = await userLogin(username, password, state);
    setLoader(false);
    if (!response.success) {
      setError(response.message);
    } else {
      navigate(state?.from ? state.from : "/");
    }
  };

  return (
    <>
      <p class="txt-bold">Login to Plube Videos!</p>
      <br />
      {loader && <Loader type="Oval" color="#f50057" height={50} width={50} />}
      <div className="flex h-center">
        <form
          className="form needs-validation"
          noValidate
          onSubmit={(event) => formSubmit(event)}
        >
          <div className="form-row">
            <p className="form-field">
              <label htmlFor="name">UserName</label>
              <input
                type="text"
                placeholder="UserName"
                value={username}
                required
                onChange={(e) =>
                  userDispatch({
                    type: "SET_USERNAME",
                    payload: e.target.value
                  })
                }
              />
              <span className="error-msg">Please enter valid email</span>
              <span className="success-msg"></span>
            </p>
          </div>
          <div className="form-row">
            <p className="form-field">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                value={password}
                placeholder="Password"
                autoComplete="true"
                required
                onChange={(e) =>
                  userDispatch({
                    type: "SET_PASSWORD",
                    payload: e.target.value
                  })
                }
              />
              <span className="error-msg">Please enter valid password</span>
              <span className="success-msg"></span>
            </p>
          </div>
          <div>
            <button type="submit" className="btn primary inline">
              Login
            </button>
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="btn primary inline"
            >
              SignUp{" "}
            </button>
            {error && <p>{error}</p>}
          </div>
        </form>
      </div>
    </>
  );
};
