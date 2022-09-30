import React, { useEffect, useState } from "react";
import "./Rankings.scss";
import rankLogo1 from "assets/images/rank1.png";
import rankLogo2 from "assets/images/rank2.png";
import rankLogo3 from "assets/images/rank3.png";
import rankLogo4 from "assets/images/rank4.png";
import axios from "axios";
import { infoType } from "Slices/userInfo";
import { useSelector } from "react-redux";

interface myUniType {
  donation: number;
  homepage: string;
  id: number;
  logoUrl: string;
  ranking: number;
  trophyList: [];
  universityAddress: string;
  universityName: string;
}

function MyUniRank() {
  // const myUni = { rank: 112, name: "싸피대학교", price: "53000000" };
  const [myUni, setMyUni] = useState<myUniType>({
    donation: 0,
    homepage: "",
    id: 0,
    logoUrl: "",
    ranking: 0,
    trophyList: [],
    universityAddress: "",
    universityName: ""
  });
  const storeUser = useSelector((state: infoType) => state.userInfo.userInfo);
  useEffect(() => {
    axios({
      url: `http://j7c208.p.ssafy.io:8080/api/univers`,
      method: "get",
      headers: { Authorization: `Bearer ${localStorage.token}` },
      params: { id: storeUser.universityPk }
    })
      .then(res => {
        setMyUni(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  let rankImg = "";
  let rankClass = "";
  if (myUni.ranking === 1) {
    rankImg = rankLogo1;
    rankClass = "rankLogo1";
  } else if (myUni.ranking === 2) {
    rankImg = rankLogo2;
    rankClass = "rankLogo2";
  } else if (myUni.ranking === 3) {
    rankImg = rankLogo3;
    rankClass = "rankLogo3";
  } else {
    rankImg = rankLogo4;
    rankClass = "rankLogo4";
  }
  return (
    <div key={storeUser.ranking} className="rank-main">
      <div className="logo-box">
        <img className={rankClass} src={rankImg} alt="" />
        <p className="rank-main-rank">{myUni.ranking}</p>
      </div>
      <p className="rank-main-name">{myUni.universityName}</p>
      <p className="rank-main-price">
        {myUni.donation.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} MOKO
      </p>
    </div>
  );
}

export default MyUniRank;
