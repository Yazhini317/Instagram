import React, { useRef, useState } from "react";
import { GoDotFill } from "react-icons/go";
import useFetch from "./useFetch";
import { IoIosMore } from "react-icons/io";
import { PiHeartLight } from "react-icons/pi";
import { FiMessageCircle } from "react-icons/fi";
import { BiRepost } from "react-icons/bi";
import { RiSendInsLine } from "react-icons/ri";
import { Button } from "react-bootstrap";

import { IoIosArrowDropright } from "react-icons/io";

function Feed() {
  const { post, setPost, error, setError, isLoading } = useFetch(
    "https://instagramnpm.onrender.com",
  );
  const [showLeft, setLeft] = useState(false);
  const [showRight, setRight] = useState(true);

  const storyRef = useRef();

  const checkScroll = () => {
    const element = storyRef.current;

    if (element.scrollLeft <= 0) {
      setLeft(false);
    } else {
      setLeft(true);
    }
    if (element.scrollLeft + element.clientWidth >= element.scrollWidth - 1) {
      setRight(false);
    } else {
      setRight(true);
    }
  };

  const storyScrollRight = () => {
    storyRef.current.scrollBy({
      left: 300,
      behavior: "smooth",
    });
    setTimeout(() => {
      checkScroll();
    }, 300);
  };
  const storyScrollLeft = () => {
    storyRef.current.scrollBy({
      left: -300,
      behavior: "smooth",
    });

    setTimeout(() => {
      checkScroll();
    }, 300);
  };

  return (
    <>
      <div className="p-3 story">
        {/* ONLY STORIES SCROLL */}
        <div ref={storyRef} className="d-flex story-container">
          {post.map((posts) => {
            return (
              <div className="story-item ms-1" key={posts.id}>
                
                  <img
                    src={posts.user.profileImage}
                    className="story-loader rounded-circle"
                    alt=""
                  />
                
              </div>
            );
          })}
        </div>

        {/* LEFT ARROW */}
        {showLeft && (
          <button className="story-arrow-left" onClick={storyScrollLeft}>
            <i className="bi bi-chevron-left"></i>
          </button>
        )}

        {/* RIGHT ARROW */}
        {showRight && (
          <button className="story-arrow" onClick={storyScrollRight}>
            <i className="bi bi-chevron-right"></i>
          </button>
        )}
      </div>
      <div className="flex-column">
        {post.map((posts) => {
          return (
            <div
              key={posts.id}
              className="d-flex flex-column align-items-center p-3 ms-3 gap-2"
            >
              <div className="d-flex post gap-2 align-items-center">
                <img
                  src={posts.user.profileImage}
                  className="rounded-circle"
                  alt=""
                />
                <span  style={{fontSize:"12px"}} className="">
                  {posts.user.username} <GoDotFill size={6} />{" "}
                  {posts.timestamp}
                  {posts.user.following ? (
                    <p className="following">Following</p>
                  ) : (
                    <p className="following" style={{ fontSize: "smaller" }}>
                      Suggested for you
                    </p>
                  )}
                </span>
                {!posts.user.following && (
                  <div className="post-follow d-flex ms-auto">
                    <Button style={{fontSize:'10px'}} className="pe-2 ps-2">Follow</Button>
                  </div>
                )}
                <div className="ms-auto">{<IoIosMore size={25} />}</div>
              </div>
              <img src={posts.postImage} className="post " alt="" />

              {/* Icons*/}
              <div className="d-flex  post align-items-center justify-content-start">
                <div className="icon-box d-flex   align-items-center">
                  <PiHeartLight className="icons" size={26} />
                  {posts.likes}
                  <span className="pop-icons">Likes</span>
                </div>
                <div className="icon-box  align-items-center d-flex">
                  <i
                    className="bi bi-chat  icons"
                    style={{ fontSize: "25px" }}
                  ></i>
                  {posts.commentsCount}
                  <span className="pop-icons">Comments</span>
                </div>
                <div className="icon-box d-flex align-items-center ">
                  <i
                    className="bi bi-repeat me-1 p-1 mb-1 icons"
                    style={{ fontSize: "25px" }}
                  ></i>
                  {posts.repostCount}
                  <span className="pop-icons">Repost</span>
                </div>
                <div className="icon-box d-flex align-items-center mt-1">
                  <RiSendInsLine className="icons mb-1" size={22} />
                  <span className="pop-icons">Send</span>
                </div>
                <div className="icon-box d-flex ms-auto">
                  <i
                    className="bi bi-bookmark ms-auto icons"
                    style={{ fontSize: "21px" }}
                  ></i>
                  <span className="pop-icons">Save</span>
                </div>
              </div>
              <div className="post mb-3 " style={{fontSize:"13px"}}>
                <span style={{fontSize:"13px",fontWeight:"600",marginRight:"5px"}} className=""><span style={{fontWeight:'bold'}}>{posts.user.username}</span>
               <span className="ms-2">{posts.caption}</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Feed;
