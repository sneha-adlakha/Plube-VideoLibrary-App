import "./Navigation.css";
import "../Video/VideoCard.css";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import {
  faHamburger,
  faSignInAlt,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";

export const Navigation = ({ openSidebar }) => {
  const navRef = useRef(null);
  const { login, userLogout } = useAuth();
  const linkStyle = {
    textDecoration: "none",
    color: "inherit",
    backgroundColor: "inherit"
  };
  return (
    <>
      <nav className="navContainer">
        <div className="nav-left">
          <div className="mobile-container">
            <div className="badge-icon-container toggle" ref={navRef}>
              <div className="badge-icon " onClick={() => openSidebar()}>
                <FontAwesomeIcon icon={faHamburger} />
              </div>
            </div>
          </div>
          <div className="badge-icon-container">
            <div className="badge-icon">
              <div>PLUBE</div>
            </div>
          </div>
        </div>
        {login && (
          <div className="nav-right">
            <div class="badge-icon-container">
              <div className="badge-icon">
                <NavLink style={linkStyle} to="/">
                  <button className="btn" onClick={() => userLogout()}>
                    LogOut{" "}
                    <span>
                      <FontAwesomeIcon icon={faSignOutAlt} />
                    </span>
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
        )}
        {!login && (
          <div className="nav-right">
            <div class="badge-icon-container">
              <div className="badge-icon">
                <NavLink style={linkStyle} to="/login">
                  <button className="btn">
                    LogIn <FontAwesomeIcon icon={faSignInAlt} />
                  </button>
                </NavLink>
              </div>
            </div>
            <div class="badge-icon-container">
              <div className="badge-icon">
                <NavLink style={linkStyle} to="/signup">
                  <button className="btn">
                    Sign Up <FontAwesomeIcon icon={faSignInAlt} />
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};
