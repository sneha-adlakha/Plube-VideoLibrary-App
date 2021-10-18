import { Link } from "react-router-dom";
import "./VideoCard.css";
import { useAuth } from "../../Context/AuthContext";
import { useContent } from "../../Context/DataContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { SaveVideo } from "./SaveVideo";
import { updateLike, addToHistory } from "../../ServerRequest/fetchData";

export const LikedVideoCard = ({ _id }) => {
  const {
    state: { videosList },
    dispatch
  } = useContent();
  const { userData, setLoader } = useAuth();
  const { title, author, image } = videosList.find(
    (video) => video._id === _id
  );
  console.log(userData._id);
  return (
    <div className="video-card">
      <Link
        className="no-line"
        to={`/${_id}`}
        onClick={() => addToHistory(_id, userData._id, dispatch, setLoader)}
      >
        <img className="img" alt="video-img" src={image}></img>

        <div className="cardbody">
          <div className="avatarcontainer">
            <img className="avatarimg" alt="detail" src={image} />
          </div>
          <div className="video-detail">
            <div className="txt-normal">{title}</div>
            <p className="txt-light">{author}</p>
          </div>
          <div className="flex-nowrap flex-gap-md">
            <div
              onClick={() => updateLike(_id, userData._id, dispatch, setLoader)}
              className="badge-icon"
            >
              <FontAwesomeIcon icon={faThumbsUp} />
            </div>
            <SaveVideo _id={_id} />
          </div>
        </div>
      </Link>
    </div>
  );
};
