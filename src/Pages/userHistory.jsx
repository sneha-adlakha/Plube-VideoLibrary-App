import { useEffect } from "react";
import { useContent } from "../Context/DataContext";
import { useAuth } from "../Context/AuthContext";
import { HistoryVideoCard } from "../Components/Video/HistoryCard";
import Loader from "react-loader-spinner";
import { fetchUserHistory, clearHistory } from "../ServerRequest/fetchData";
export const UserHistory = () => {
  const {
    state: { history },
    dispatch
  } = useContent();
  const { userData, loader, setLoader } = useAuth();
  useEffect(() => {
    document.title = "Plube | History";
  }, []);
  useEffect(() => {
    fetchUserHistory(userData._id, dispatch, setLoader);
  }, []);

  return loader ? (
    <div>
      <Loader />
    </div>
  ) : (
    <>
      <h4 className="txt-bold">Videos in your History</h4>
      <div className="flex mt-1">
        {history.length === 0 && (
          <>
            <p>No Videos in your History</p>
          </>
        )}
        {history.length > 0 && (
          <button onClick={() => clearHistory(userData._id, dispatch)}>
            Clear History
          </button>
        )}
        {history
          .slice(0)
          .reverse()
          .map((_id) => {
            return <HistoryVideoCard key={_id} _id={_id} />;
          })}
      </div>
    </>
  );
};
