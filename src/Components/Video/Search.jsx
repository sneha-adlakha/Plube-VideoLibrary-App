import { useState } from "react";
import "./Search.css";
import { useContent } from "../../Context/DataContext";
export const SearchCard = () => {
  const [searchvalue, setSearchValue] = useState("");
  const { dispatch } = useContent();
  const searchHandler = (e) => {
    if (e.keyCode === 13) {
      dispatch({ type: "SEARCH", payload: searchvalue });
    }
  };
  return (
    <>
      <div className="search-container mb-1">
        <div className="text-box">
          {" "}
          <input
            className="text-input"
            type="text"
            value={searchvalue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={searchHandler}
            placeholder="Search Here"
          />
          <span
            class="search-icon"
            onClick={() => {
              dispatch({ type: "SEARCH", payload: searchvalue });
              setSearchValue("");
            }}
          >
            <i className="fas fa-search fa-lg"></i>
          </span>
        </div>
        <button
          className="reset"
          onClick={() => {
            setSearchValue("");
            dispatch({ type: "RESETSEARCH" });
          }}
        >
          Reset
        </button>
      </div>
    </>
  );
};
