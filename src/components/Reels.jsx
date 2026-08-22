import React, { useEffect, useState } from "react";
import "./Reels.css";
import { Button } from "react-bootstrap";
import { useRef } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
function Reels() {
  const [reels, setReels] = useState([]);
  useEffect(() => {
    fetch("https://instagram-project-oybk.onrender.com/reels")
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Data not Found");
        }
      })
      .then((data) => setReels(data))
      .catch((error) => console.log(error));
  }, []);

  const [showTop,setTop]=useState(false)
  const [showBottom,setBottom]=useState(true)
  const reelRef=useRef()
  const checkTopBottom = () => {
    const element = reelRef.current;

    if (!element) return;

    // At top
    setTop(element.scrollTop > 0);

    // At bottom
    setBottom(
        element.scrollTop + element.clientHeight <
        element.scrollHeight - 1
    );
};

  const reelScrollBottom = () => {
    reelRef.current.scrollBy({
        top: reelRef.current.clientHeight,
        behavior: "smooth"
    });

    setTimeout(checkTopBottom, 500);
};

const reelScrollTop = () => {
    reelRef.current.scrollBy({
        top: -reelRef.current.clientHeight,
        behavior: "smooth"
    });

    setTimeout(checkTopBottom, 500);
};
 
  return (
    <>
      <div ref={reelRef} className="d-flex gap-5 vw-100 reelcontainer">
        <div>
          {reels.map((reel) => {
            return (
              <div key={reel.id} className="reels">
                <video
                  className="reels"
                  src={String(reel.videoUrl)}
                  width="400px"
                  autoPlay
                  muted
                  playsInline
                />
                <div className="side d-flex flex-column gap-2">
                  <div className="d-flex align-items-center">
                    <img
                      src={reel.userImage}
                      className="rounded-circle image"
                    />
                    <span className="fw-bold fs-6 d-flex mt-2">
                      <p>{reel.username}</p>

                    </span>
                      <div
                        style={{ fontSize: "12px" }}
                        className="text-primary ms-5 mb-2"
                      >
                        Follow
                      </div>
                  </div>
                  <div className="">
                    <p>{reel.caption}</p>
                  </div>
                </div>
                <div>
                  </div>
              </div>
            );
          })}
        </div>
        <div  className="scrolls d-flex flex-column justify-content-center vh-100 gap-5">
         {
          showTop && (

            <FaChevronUp style={{fontSize:"35px",color:"gray"}} onClick={()=>{reelScrollTop()}} />
          )
         }
         {
          showBottom && (

            <FaChevronDown style={{fontSize:"35px",color:"gray"}} onClick={()=>{reelScrollBottom()}}/>
          )
         }
        </div>
      </div>
    </>
  );
}

export default Reels;
