import { useAuth } from "../Context/AuthContext";
import Loader from "react-loader-spinner";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Login.css";
export const Signup = () => {
  const [error, setError] = useState("");
  const { login } = useAuth();
  const [successRegistration, setsuccessRegistration] = useState(false);
  const {
    userDispatch,
    userstate: { name, username, password, email },
    loader,
    setLoader,
    userData,
    newRegistration
  } = useAuth();

  useEffect(() => {
    document.title = "Plube | Signup";
  }, []);

  const formSubmit = async (event) => {
    setLoader(true);
    event.preventDefault();
    if (!event.target.checkValidity()) {
      event.target.classList.add("was-validated");
    }
    const response = await newRegistration(name, username, password, email);
    setLoader(false);
    console.log(response);
    if (!response.success) {
      setError(response.message);
    } else {
      setsuccessRegistration(true);
    }
  };

  return (
    <>
      {!successRegistration && (
        <>
          <div className="flex h-center">
            <form
              className="form needs-validation"
              noValidate
              onSubmit={(event) => formSubmit(event)}
            >
              <div className="form-row">
                <p className="form-field">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    required
                    onChange={(e) =>
                      userDispatch({
                        type: "SET_NAME",
                        payload: e.target.value
                      })
                    }
                  />
                  <span className="error-msg">Please enter valid name</span>
                  <span className="success-msg"></span>
                </p>
              </div>
              <div className="form-row">
                <p className="form-field">
                  <label htmlFor="username">User Name</label>
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
                  <span className="error-msg">Please enter valid username</span>
                  <span className="success-msg"></span>
                </p>
              </div>
              <div className="form-row">
                <p className="form-field">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    required
                    onChange={(e) =>
                      userDispatch({
                        type: "SET_EMAIL",
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
                    placeholder="Password"
                    value={password}
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
                {!loader && (
                  <button className="btn primary inline">Sign Up</button>
                )}
                {loader && (
                  <button className="btn primary inline">Signing Up</button>
                )}
                <NavLink to="/login">
                  <button type="button" className="btn primary inline">
                    Already Registered? Log In
                  </button>
                </NavLink>
              </div>
              {error && <p className="txt-desc primaryBg-txt">{error}</p>}
            </form>
          </div>
        </>
      )}

      {successRegistration && login && (
        <div>
          <p className="txt-normal">
            {" "}
            Hi <b className="secondary-txt">{userData.name}.</b> You are
            successfully registered with<b> Plube.</b>
          </p>
          <NavLink
            className="txt-normal"
            style={{ textDecoration: "none" }}
            to="/"
          >
            <p>
              <b>Click Here </b>to Watch Videos.
            </p>
          </NavLink>
        </div>
      )}
    </>
  );
};
