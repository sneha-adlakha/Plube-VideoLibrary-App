import React, { useEffect } from "react";
import { useContent } from "../Context/DataContext";
import { useAuth } from "../Context/AuthContext";
import { useNavigate, useParams } from "react-router";
import "./VideoPlayer.css";
import { updateLike, addToHistory } from "../ServerRequest/fetchData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { SaveVideo } from "../Components/Video/SaveVideo";
export const videoURL = (id) => `https://www.youtube.com/embed/${id}`;
function VideoPlayer() {
  const { videoId } = useParams();
  const {
    state: { videosList, likedVideos },
    dispatch
  } = useContent();
  const {
    vid,
    title,
    author,
    image,
    views,
    date,
    subscribers,
    description
  } = videosList.find((video) => video._id === videoId);
  const { login, userData, loader, setLoader } = useAuth();
  const navigate = useNavigate();
  const funclikedVideo = (videos, id) => videos.some((item) => item === id);
  useEffect(() => {
    document.title = title;
  }, [title]);
  return (
    <>
      <div className="video-container">
        <iframe
          width="100%"
          height="300px"
          title={title}
          src={videoURL(vid)}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="video-description">
        <p>{views} Views</p>
        <div className="flex flex-gap-sm">
          {funclikedVideo(likedVideos, videoId) ? (
            <div
              onClick={() =>
                login
                  ? updateLike(videoId, userData._id, dispatch, setLoader)
                  : navigate("/login")
              }
              className="badge-icon"
            >
              <FontAwesomeIcon icon={faThumbsUp} />
            </div>
          ) : (
            <div
              onClick={() =>
                login
                  ? updateLike(videoId, userData._id, dispatch, setLoader)
                  : navigate("/login")
              }
              className="badge-icon"
            >
              <FontAwesomeIcon style={{ color: "pink" }} icon={faThumbsUp} />
            </div>
          )}
          <SaveVideo _id={videoId} />
        </div>
      </div>
    </>
  );
}

export default VideoPlayer;
