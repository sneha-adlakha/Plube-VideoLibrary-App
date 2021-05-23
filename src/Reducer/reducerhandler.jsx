export const isVideoExists = (list, id) => {
  list.some((item) => item === id);
};
export const videoReducer = (state, { type, payload }) => {
  switch (type) {
    case "INITALISE":
      return { ...state, videosList: payload };
    case "INITALISE_LIKES":
      return { ...state, likedVideos: payload };
    case "INITALISE_HISTORY":
      return { ...state, history: payload };
    case "INITALISE_PLAYLIST":
      return { ...state, playlist: payload };
    case "SEARCH":
      return { ...state, searchData: payload.toLowerCase() };
    case "RESETSEARCH":
      return { ...state, searchData: "" };
    case "SHOW_TOAST":
      return { ...state, toastMsg: payload };
    case "TOGGLE_LIKE":
      const likeFlag = state.likedVideos.some((videoId) => videoId === payload);
      return {
        ...state,
        likedVideos: likeFlag
          ? state.likedVideos.filter((video) => video !== payload)
          : state.likedVideos.concat(payload)
      };
    case "TOGGLE_PLAYLIST":
      const listDetail = state.playlist.find(
        (item) => item._id === payload.playlistId
      );
      const videoDetail = state.playlist.some(
        (videoId) => videoId === payload._id
      );
      return {
        ...state,
        playlist: state.playlist.map((listItem) =>
          listItem._id === listDetail._id
            ? {
                ...listItem,
                videos: videoDetail
                  ? listItem.videos.filter((videoId) => videoId !== payload._id)
                  : listItem.videos.concat(payload._id)
              }
            : listItem
        )
      };
    case "ADDTOHISTORY":
      return {
        ...state,
        history: isVideoExists(state.history, payload)
          ? state.history.filter((video) => video !== payload).concat(payload)
          : state.history.concat(payload)
      };
    case "RENAME_PLAYLIST":
      return {
        ...state,
        playlist: state.playlist.map((list) =>
          list._id === payload.playlistId
            ? { ...list, name: payload.playlistName }
            : list
        )
      };
    case "DELETE_PLAYLIST":
      return {
        ...state,
        playlist: state.playlist.filter((list) => list._id !== payload)
      };
    case "REMOVEFROMHISTORY": {
      return {
        ...state,
        history: state.history.filter((videoId) => videoId !== payload)
      };
    }
    case "CLEARHISTORY": {
      return { ...state, history: [] };
    }
    case "ADD_TO_PLAYLIST":
      if (payload.name) {
        return { ...state, playlist: state.playlist.concat(payload) };
      } else {
        return { ...state };
      }
    default:
      return state;
  }
};
