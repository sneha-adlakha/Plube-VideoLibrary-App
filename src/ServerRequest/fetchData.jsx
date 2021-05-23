import axios from "axios";
export const isVideoExists = (list, id) => {
  list.some((item) => item === id);
};

export const fetchVideos = async (dispatch, setLoader) => {
  try {
    setLoader(true);
    const {
      data: { videos }
    } = await axios.get("https://youtube.snehaadlakha.repl.co/videos");
    dispatch({ type: "INITALISE", payload: videos });
    console.log(videos);
    setLoader(false);
  } catch (err) {
    console.log(err);
  }
};

export const fetchUserLikes = async (userId, dispatch, setLoader) => {
  setLoader(true);
  const {
    data: { likedVideoItems }
  } = await axios.get(
    `https://Youtube.snehaadlakha.repl.co/liked-video/${userId}`
  );
  const videoList = likedVideoItems.map((item) => item._id);
  dispatch({ type: "INITALISE_LIKES", payload: videoList });
  setLoader(false);
};

export const fetchUserPlaylist = async (userId, dispatch, setLoader) => {
  setLoader(true);
  let {
    data: { playlist }
  } = await axios.get(
    `https://Youtube.snehaadlakha.repl.co/playlist/${userId}`
  );
  playlist = playlist.map((list) => ({
    ...list,
    videos: list.videos.map((item) => item._id)
  }));
  console.log(playlist);
  setLoader(false);
  dispatch({ type: "INITALISE_PLAYLIST", payload: playlist });
};

export const fetchUserHistory = async (userId, dispatch, setLoader) => {
  setLoader(true);
  const {
    data: { history }
  } = await axios.get(`https://Youtube.snehaadlakha.repl.co/history/${userId}`);
  console.log(history);
  const videoList = history.map((item) => item._id);
  dispatch({ type: "INITALISE_HISTORY", payload: videoList });
  setLoader(false);
};

export const updateLike = async (_id, userId, dispatch) => {
  dispatch({ type: "SHOW_TOAST", payload: "User Likes Updated" });
  const {
    status
  } = await axios.post(
    `https://Youtube.snehaadlakha.repl.co/liked-video/${userId}`,
    { _id }
  );
  dispatch({ type: "TOGGLE_LIKE", payload: _id });
};

export const addToHistory = async (_id, userId, dispatch) => {
  const {
    status
  } = await axios.post(
    `https://Youtube.snehaadlakha.repl.co/history/${userId}`,
    { _id }
  );
  dispatch({ type: "ADDTOHISTORY", payload: _id });
};
export const removefromHistory = async (_id, userId, dispatch,loader) => {
  const response= await axios.put(
    `https://Youtube.snehaadlakha.repl.co/history/${userId}`,
    { _id }
  );
  console.log(response);
  dispatch({ type: "REMOVEFROMHISTORY", payload: _id });
};

export const updatePlaylist = async (userId, playlistId, videoId, dispatch) => {
  dispatch({ type: "SHOW_TOAST", payload: "User Playlist Updated" });
  const {
    status
  } = await axios.post(
    `https://Youtube.snehaadlakha.repl.co/playlist/${userId}/list/${playlistId}`,
    { _id: videoId }
  );
  dispatch({ type: "TOGGLE_PLAYLIST", payload: { playlistId, _id: videoId } });
};
export const changeName = async (
  userId,
  playlistId,
  playlistName,
  dispatch
) => {
  dispatch({ type: "SHOW_TOAST", payload: "User Playlist Changed" });
  const {
    status
  } = await axios.put(
    `https://Youtube.snehaadlakha.repl.co/playlist/${userId}`,
    { _id: playlistId, name: playlistName }
  );
  dispatch({ type: "RENAME_PLAYLIST", payload: { playlistId, playlistName } });
};
export const clearHistory = async (userId, dispatch) => {
  const { status } = await axios.delete(
    `https://Youtube.snehaadlakha.repl.co/history/${userId}`
  );
  dispatch({ type: "CLEARHISTORY" });
};
export const deletePlaylist = async (userId, playlistId, dispatch) => {
  dispatch({ type: "SHOW_TOAST", payload: "User Playlist Deleted" });
  const { status } = await axios.put(
    `https://Youtube.snehaadlakha.repl.co/playlist/${userId}/list/${playlistId}`
  );
  dispatch({ type: "DELETE_PLAYLIST", payload: playlistId });
};

export const createNewPlaylist = async (
  userId,
  playlistName,
  videoId,
  dispatch,
  setLoader,
  setplaylistName
) => {
  if (playlistName) {
    dispatch({ type: "SHOW_TOAST", payload: " Adding Playlist" });
    let {
      data: { playlist }
    } = await axios.post(
      `https://Youtube.snehaadlakha.repl.co/playlist/${userId}`,
      {
        name: playlistName,
        _id: videoId
      }
    );
    playlist.videos = playlist.videos.map((video) => video._id);
    dispatch({ type: "ADD_TO_PLAYLIST", payload: playlist });
    setLoader(false);
    setplaylistName(" ");
  }
};
