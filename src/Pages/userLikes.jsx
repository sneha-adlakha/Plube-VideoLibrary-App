import { useEffect } from "react";
import { useContent } from "../Context/DataContext";
import { useAuth } from "../Context/AuthContext";
import { LikedVideoCard } from "../Components/Video/LikeVideoCard";
import Loader from "react-loader-spinner";
export const UserLikes = () => {
  const {
    state: { likedVideos }
  } = useContent();
  const { loader } = useAuth();
  useEffect(() => {
    document.title = "Plube | Likes";
  }, []);
  console.log(likedVideos);
  return loader ? (
    <div>
      <Loader />
    </div>
  ) : (
    <>
      <h4 className="txt-bold">Videos Liked by You</h4>
      <div className="flex mt-1">
        {likedVideos.length === 0 && (
          <>
            <p>No Videos to show</p>
          </>
        )}
        {likedVideos.length > 0 &&
          likedVideos.map((_id) => {
            return <LikedVideoCard key={_id} _id={_id} />;
          })}
      </div>
    </>
  );
};
