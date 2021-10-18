import { useContent } from "../../Context/DataContext";
import { useAuth } from "../../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { SaveVideo } from "./SaveVideo";

import { updateLike, addToHistory } from "../../ServerRequest/fetchData";
import "./VideoCard.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
export const VideoCard = ({ _id }) => {
  const {
    state: { videosList, likedVideos },
    dispatch
  } = useContent();

  const { login, userData, setLoader } = useAuth();
  const navigate = useNavigate();
  const { title, author, image } = videosList.find(
    (video) => video._id === _id
  );
  const funclikedVideo = (videos, id) => videos.some((item) => item === id);

  return (
    <>
      <div className="video-card">
        <Link
          className="no-line"
          to={`/${_id}`}
          onClick={() =>
            login ? addToHistory(_id, userData._id, dispatch) : ""
          }
        >
          <img className="img" alt="video-img" src={image}></img>
        </Link>
        <div className="cardbody">
          <div className="avatarcontainer">
            <img className="avatarimg" alt="detail" src={image} />
            <div className="video-detail">
              <div className="title">{title}</div>
              <p className="author">{author}</p>
            </div>
          </div>
          <div className="flex-nowrap flex-gap-md">
            {funclikedVideo(likedVideos, _id) ? (
              <div
                onClick={() =>
                  login
                    ? updateLike(_id, userData._id, dispatch, setLoader)
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
                    ? updateLike(_id, userData._id, dispatch, setLoader)
                    : navigate("/login")
                }
                className="badge-icon"
              >
                <FontAwesomeIcon style={{ color: "pink" }} icon={faThumbsUp} />
              </div>
            )}
            <SaveVideo _id={_id} />
          </div>
        </div>
      </div>
    </>
  );
};
