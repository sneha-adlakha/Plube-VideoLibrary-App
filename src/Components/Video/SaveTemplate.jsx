import { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useContent } from "../../Context/DataContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {
  createNewPlaylist,
  updatePlaylist
} from "../../ServerRequest/fetchData";
import "./savetemplate.css";
export const SaveTemplate = ({ _id, setShowTemplate }) => {
  const {
    state: { playlist },
    dispatch
  } = useContent();
  const isVideoExists = (list, id) => list.some((item) => item === id);
  const [playlistName, setplaylistName] = useState("");
  const { userData, setLoader } = useAuth();
  const NewPlaylist = async (event) => {
    if (event.key === "Enter") {
      await createNewPlaylist(
        userData._id,
        playlistName,
        _id,
        dispatch,
        setLoader,
        setplaylistName
      );
    }
  };

  return (
    <>
      <div id="playlistadd" className="showaddplaylist">
        <div className="txt-heading">Add to PlayList</div>
        <ul className="list-ul">
          {playlist.map(({ _id: playlistId, name, videos }) => (
            <li key={playlistId}>
              <label>
                <input
                  type="checkbox"
                  className="playlist-input"
                  onChange={() =>
                    updatePlaylist(
                      userData._id,
                      playlistId,
                      _id,
                      dispatch,
                      setLoader
                    )
                  }
                  checked={isVideoExists(videos, _id)}
                />
                {""}
                {console.log(isVideoExists(videos, _id))}
                {name}
              </label>
            </li>
          ))}
        </ul>
        <div>
          <input
            className="playlist-txtbox"
            onKeyDown={NewPlaylist}
            onChange={(event) => setplaylistName(event.target.value)}
            value={playlistName}
            type="text"
            placeholder="Playlist Name"
          />
        </div>
        <button
          className="playlistbtn"
          onClick={() =>
            createNewPlaylist(
              userData._id,
              playlistName,
              _id,
              dispatch,
              setLoader,
              setplaylistName
            )
          }
        >
          Save
        </button>
        <button
          className="playlistbtn"
          id="btncancel"
          type="button"
          onClick={() => setShowTemplate(false)}
        >
          Cancel
        </button>
      </div>
      <br />
    </>
  );
};
