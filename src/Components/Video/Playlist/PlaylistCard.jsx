import { useAuth } from "../../../Context/AuthContext";
import { useContent } from "../../../Context/DataContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { updatePlaylist, addToHistory } from "../../../ServerRequest/fetchData";
import { Link } from "react-router-dom";
export const PlaylistCard = ({ _id, playlistId }) => {
  const {
    state: { videosList, playlist },
    dispatch
  } = useContent();
  const { userData, loader } = useAuth();
  console.log("videolist", videosList);
  console.log("id", _id);
  const { vid, name, author, views, image, title } = videosList.find(
    (video) => video._id === _id
  );
  return (
    <div className="video-card">
      <Link
        className="no-line"
        to={`/${_id}`}
        onClick={() => addToHistory(_id, userData._id, dispatch)}
      >
        <img className="img" alt="video-img" src={image}></img>
      </Link>
      <div className="cardbody">
        <div className="avatarcontainer">
          <img className="avatarimg" alt="detail" src={image} />
          <div className="video-detail">
            <div className="title">{title}</div>
            <p className="author">{author}</p>
            <p className="author">{views} Views</p>
          </div>
        </div>
        <div className="flex-nowrap flex-gap-md">
          <div
            onClick={() =>
              updatePlaylist(_id, playlistId, userData._id, dispatch)
            }
            className="badge-icon"
          >
            <FontAwesomeIcon icon={faSave} />
          </div>
        </div>
      </div>
    </div>
  );
};
