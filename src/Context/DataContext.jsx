import React, { createContext, useContext, useReducer } from "react";
import { videoReducer } from "../Reducer/reducerhandler";
export const VideoContext = createContext();
export const useContent = () => useContext(VideoContext);
export const VideoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(videoReducer, initialState);
  return (
    <VideoContext.Provider value={{ state, dispatch }}>
      {children}
    </VideoContext.Provider>
  );
};

const initialState = {
  videosList: [],
  likedVideos: [],
  history: [],
  playlist: [],
  toastMsg: "",
  searchData: ""
};
