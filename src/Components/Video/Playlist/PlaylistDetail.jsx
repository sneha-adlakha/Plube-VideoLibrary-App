import { useRef, useState } from "react";
import { useAuth } from "../../../Context/AuthContext";
import { useContent } from "../../../Context/DataContext";
import "./playlist.css";
import { changeName, deletePlaylist } from "../../../ServerRequest/fetchData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faEdit,
  faTrash,
  faUndo
} from "@fortawesome/free-solid-svg-icons";
export const PlaylistDetail = ({ name, playlistId }) => {
  const [playlistName, setPlaylistName] = useState(name);
  const [updatedValue, setupdatedValue] = useState(false);
  const {
    state: { playlist },
    dispatch
  } = useContent();
  const inputRef = useRef(null);
  const { userData, loader } = useAuth();
  const updatePlaylistName = async () => {
    await changeName(userData._id, playlistId, playlistName, dispatch, loader);
    setupdatedValue(false);
  };
  const deleteList = async () => {
    await deletePlaylist(userData._id, playlistId, dispatch, loader);
    setupdatedValue(true);
  };
  const isKeyDown = (e) => {
    if (e.key === "Enter") {
      updatePlaylistName();
    }
  };
  const edit = () => {
    setupdatedValue(true);
    inputRef.current.focus();
  };
  const undoChange = () => {
    setPlaylistName(name);
    setupdatedValue(false);
  };
  return (
    <div className="playlist-detail flex-gap-md">
      {playlistId !== playlist[0]._id ? (
        <input
          type="text"
          ref={inputRef}
          value={playlistName}
          onKeyDown={isKeyDown}
          onChange={(e) => setPlaylistName(e.target.value)}
          onFocus={() => setupdatedValue(true)}
          className={updatedValue ? "playlist-updated" : "playlist-name"}
        />
      ) : (
        <>
          {" "}
          <p className="playlist-name">{name}</p>
        </>
      )}

      {playlistId !== playlist[0]._id && (
        <div className="flex-nowrap flex-gap-md">
          <div
            onClick={() => {
              updatedValue ? updatePlaylistName() : edit();
            }}
            className="badge-icon"
          >
            {updatedValue ? (
              <FontAwesomeIcon icon={faCheck} />
            ) : (
              <FontAwesomeIcon icon={faEdit} />
            )}
          </div>
          <div
            onClick={() => {
              updatedValue ? undoChange() : deleteList();
            }}
            className="badge-icon"
          >
            {updatedValue ? (
              <FontAwesomeIcon icon={faUndo} />
            ) : (
              <FontAwesomeIcon icon={faTrash} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
