import "./styles.css";
import { useEffect, useRef } from "react";
import { Toast } from "./Components/Toast";
import { useContent } from "./Context/DataContext";
import { useAuth } from "./Context/AuthContext";
import { Navigation } from "./Components/Nav/Navigation.jsx";
import { AllVideos } from "./Components/Video/AllVideos.jsx";
import Sidebar from "./Components/Nav/Sidebar.jsx";
import { Route, Routes } from "react-router-dom";
import { Login } from "./Pages/Login";
import { Signup } from "./Pages/Signup";
import { UserLikes } from "./Pages/userLikes";
import { UserHistory } from "./Pages/userHistory";
import { Playlist } from "./Components/Video/Playlist/Playlist";
import { PrivateRoute } from "./Components/PrivateRoute/PrivateRoute";
import VideoPlayer from "./Pages/VideoPlayer";
import {
  fetchVideos,
  fetchUserLikes,
  fetchUserPlaylist
} from "./ServerRequest/fetchData";
export default function App() {
  const {
    state: { toastMsg },
    dispatch
  } = useContent();
  const { login, userData, setLoader } = useAuth();

  useEffect(() => {
    fetchVideos(dispatch, setLoader);
  }, []);

  useEffect(() => {
    if (login && userData._id) {
      fetchUserLikes(userData._id, dispatch, setLoader);
    }
  }, [login, userData]);

  useEffect(() => {
    if (login && userData._id) {
      fetchUserPlaylist(userData._id, dispatch, setLoader);
    }
  }, [login, userData]);

  const sidebarRef = useRef(null);

  const openSidebar = () => {
    sidebarRef.current.style.left = "0";
    sidebarRef.current.style.padding = "1rem";
  };

  const closeSidebar = () => {
    sidebarRef.current.style.left = "-100%";
    sidebarRef.current.style.padding = "0";
  };

  return (
    <div className="App">
      {toastMsg && <Toast />}
      <Navigation openSidebar={openSidebar} />
      <Sidebar closeSidebar={closeSidebar} ref={sidebarRef} />
      <div className="maincontainer">
        <Routes>
          <Route exact path="/" element={<AllVideos />} />
          <Route exact path="/:videoId" element={<VideoPlayer />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <PrivateRoute exact path="/userlikes" element={<UserLikes />} />
          <PrivateRoute exact path="/history" element={<UserHistory />} />
          <PrivateRoute exact path="/playlist" element={<Playlist />} />
        </Routes>
      </div>
    </div>
  );
}
