import React from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSave,
  faHome,
  faThumbsUp,
  faLock
} from "@fortawesome/free-solid-svg-icons";
const Sidebar = ({ closeSidebar }, ref) => {
  const { userLogout } = useAuth();
  const linkStyle = {
    textDecoration: "none",
    color: "inherit",
    backgroundColor: "inherit"
  };
  return (
    <div className="sidebar" ref={ref}>
      <ul className="list-group">
        <NavLink to="/" end style={linkStyle} activeClassName="selecteditem">
          <li class="listitem">
            <p>
              {" "}
              <FontAwesomeIcon icon={faHome} /> Home
            </p>
          </li>
        </NavLink>
        <NavLink
          to="/userlikes"
          end
          style={linkStyle}
          activeClassName="selecteditem"
        >
          <li class="listitem">
            <p>
              {"  "}
              <FontAwesomeIcon icon={faThumbsUp} /> Liked
            </p>
          </li>
        </NavLink>
        <NavLink
          to="/playlist"
          end
          style={linkStyle}
          activeClassName="selecteditem"
        >
          <li class="listitem">
            <p>
              {" "}
              <FontAwesomeIcon icon={faSave} /> Saved Playlists
            </p>
          </li>
        </NavLink>
        <NavLink
          to="/history"
          end
          style={linkStyle}
          activeClassName="selecteditem"
        >
          <li class="listitem ">
            <p>
              {" "}
              <FontAwesomeIcon icon={faHome} /> History
            </p>
          </li>
        </NavLink>
        <NavLink
          to="/login"
          end
          style={linkStyle}
          activeClassName="selecteditem"
        >
          <li class="listitem" onClick={() => userLogout()}>
            <p>
              {" "}
              <FontAwesomeIcon icon={faLock} /> Sign Out
            </p>
          </li>
        </NavLink>
      </ul>
      <button className=" btn sidebar-close" onClick={() => closeSidebar()}>
        X
      </button>
    </div>
  );
};

const forwardedRefSidebar = React.forwardRef(Sidebar);
export default forwardedRefSidebar;
