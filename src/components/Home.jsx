import React from "react";
import Feed from "../components/Feed";
import Suggestions from "../components/Suggestions";

function Home() {
  return (
    <>
      <div  className="d-flex vw-100 vh-100">
        <div className="w-50 feed">
          <Feed />
        </div>
        <div className="w-50 vw-100 suggestions ">
          <Suggestions />
        </div>
      </div>
    </>
  );
}

export default Home;
