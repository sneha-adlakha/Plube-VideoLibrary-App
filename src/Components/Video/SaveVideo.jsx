import { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { SaveTemplate } from "././SaveTemplate";
import { useNavigate } from "react-router";
import { useContent } from "../../Context/DataContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import "./savetemplate.css";
export const SaveVideo = ({ _id }) => {
  const {
    state: { playlist }
  } = useContent();
  const navigate = useNavigate();
  const [showTemplate, setShowTemplate] = useState(false);
  const { login } = useAuth();
  useEffect(() => {
    const viewform = document.querySelector(".showaddplaylist");
    window.onclick = (event) => {
      if (event.target === viewform) {
        setShowTemplate(false);
      }
    };
  }, [showTemplate]);
  const isVideoInPlaylist = (_id) =>
    playlist.some((item) => item.videos.some((videoId) => videoId === _id));

  return (
    <>
      {isVideoInPlaylist(_id) ? (
        <div onClick={() => setShowTemplate(false)} className="badge-icon">
          <FontAwesomeIcon icon={faCheck} /> Saved
        </div>
      ) : (
        <div
          onClick={() =>
            login
              ? setShowTemplate((showTemplate) => !showTemplate)
              : navigate("/login")
          }
          className={!showTemplate ? "badge-icon" : "hidden"}
        >
          <FontAwesomeIcon icon={faPlus} /> Save
        </div>
      )}
      {showTemplate && (
        <SaveTemplate _id={_id} setShowTemplate={setShowTemplate} />
      )}
    </>
  );
};
