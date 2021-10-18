import { useEffect, useState } from "react";
import { useContent } from "../../Context/DataContext";
import { useAuth } from "../../Context/AuthContext";
import { SearchCard } from "../Video/Search";
import { VideoCard } from "../Video/VideoCard";
import Loader from "react-loader-spinner";
import "./AllVideos.css";
export const AllVideos = () => {
  const {
    state: { videosList, searchData },
    dispatch
  } = useContent();
  const { loader } = useAuth();
  const SearchedData = searchVideos(videosList, searchData);

  useEffect(() => {
    document.title = "Plube";
  }, []);

  console.log(loader);
  return loader ? (
    <div>
      <Loader />
    </div>
  ) : (
    <>
      <p className="txt-bolder">Videos</p>
      <SearchCard />
      <div className="flex">
        {SearchedData.map((video) => (
          <VideoCard key={video._id} _id={video._id} />
        ))}
      </div>
    </>
  );
};
const searchVideos = (videosList, searchData) => {
  return videosList.filter(
    (video) =>
      video.title.toLowerCase().includes(searchData) ||
      video.description.toLowerCase().includes(searchData) ||
      video.author.toLowerCase().includes(searchData)
  );
};
