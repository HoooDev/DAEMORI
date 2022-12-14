import React, { useState } from "react";
import "./Leagues.scss";
import { useNavigate } from "react-router-dom";
import SearchIcon from "assets/images/searchIcon.svg";
import Carousel from "./Carousel";
import LeagueList from "./LeagueList";

import Scroll from "./Scroll";
import Search from "./Search";

function Leagues() {
  const [ing, setIng] = useState(true);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const handleKeyword = (e: string) => {
    setKeyword(e);
  };
  return (
    <div id="leagues">
      <div className="leagues">
        <div className="leagues-function">
          <button
            onClick={() => navigate("/leagues/create")}
            className="leagues-function-createLeague"
            type="button"
          >
            대회 생성
          </button>
          <span>
            <div className="leagues-function-leaguelist">우리 대학 대회</div>
          </span>
        </div>
        <Carousel />
        <div className="leagues-function-leaguelist">대회 목록</div>
        <div className="leagues-buttonlist">
          <div>
            <button
              type="button"
              className={
                ing === true
                  ? "leagues-buttonlist-active"
                  : "leagues-buttonlist-nonactive"
              }
              onClick={() => {
                setIng(true);
              }}
            >
              진행중
            </button>
            {ing === true ? (
              <div className="leagues-buttonlist-bar-active" />
            ) : (
              <div className="leagues-buttonlist-bar-nonactive" />
            )}
          </div>
          <div>
            <button
              type="button"
              className={
                ing === false
                  ? "leagues-buttonlist-active"
                  : "leagues-buttonlist-nonactive"
              }
              onClick={() => {
                setIng(false);
              }}
            >
              종료
            </button>
            {ing === false ? (
              <div className="leagues-buttonlist-bar-active" />
            ) : (
              <div className="leagues-buttonlist-bar-nonactive" />
            )}
          </div>
        </div>
        <div className="leagues-function-search">
          {/* "대회 검색" */}
          <input
            className="leagues-function-search-bar"
            onChange={e => handleKeyword(e.target.value)}
            type="text"
          />
          <img
            src={SearchIcon}
            alt="searchIcon"
            className="leagues-function-search-icon"
          />
        </div>
        {/* <div>
          <input onChange={e => handleKeyword(e.target.value)} type="text" />
        </div> */}
        <LeagueList keyword={keyword} status={ing} />

        {/* {ing ? <LeagueOpen keyword={keyword} status={ing} /> : null} */}
        {/* <Search /> */}
        {/* <Scroll /> */}
      </div>
    </div>
  );
}
export default Leagues;
