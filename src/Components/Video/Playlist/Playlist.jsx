import Loader from "react-loader-spinner";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";
import { useContent } from "../../../Context/DataContext";
import { PlaylistCard } from "./PlaylistCard";
import { PlaylistDetail } from "./PlaylistDetail";
import "./playlist.css";
export const Playlist = () => {
  const {
    state: { playlist }
  } = useContent();
  const { loader } = useAuth();
  useEffect(() => {
    document.title = "Playlist";
  }, []);
  return loader ? (
    <div>
      <Loader type="Oval" color="#00BFFF" height={80} width={80} />
    </div>
  ) : (
    <>
      <div className="txt-normal">Saved Videos</div>
      {playlist.map(({ _id: playlistId, name, videos }) => (
        <div key={playlistId} className="playlist-container">
          <PlaylistDetail playlistId={playlistId} name={name} />
          {videos.length > 0 && (
            <span className="txt-normal">({videos.length} Videos)</span>
          )}
          {videos.length === 0 && (
            <>
              <p>Empty List</p>
              <Link to="/">
                <button type="button" className="btn primary inline">
                  Add Some Videos
                </button>
              </Link>
            </>
          )}
          {videos.length > 0 &&
            videos.map((_id) => {
              return (
                <PlaylistCard key={_id} _id={_id} playlistId={playlistId} />
              );
            })}
        </div>
      ))}
    </>
  );
};
