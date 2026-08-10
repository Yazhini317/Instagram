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
    "http://localhost:5000/posts",
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
      <div className=" ms-5 p-3 ">
        {/* ONLY STORIES SCROLL */}
        <div ref={storyRef} className="story d-flex p-2">
          {post.map((posts) => {
            return (
              <div className="story-item  ms-3 ps-3" key={posts.id}>
                {posts.user.profileImage && (
                  <img
                    src={posts.user.profileImage}
                    className="story-loader rounded-circle"
                    alt=""
                  />
                )}
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
                <span className="">
                  {posts.user.username} <GoDotFill size={10} />{" "}
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
                    <Button className="ms-4">Follow</Button>
                  </div>
                )}
                <div className="ms-auto">{<IoIosMore size={40} />}</div>
              </div>
              <img src={posts.postImage} className="post " alt="" />

              {/* Icons*/}
              <div className="d-flex  post align-items-center justify-content-start">
                <div className="icon-box d-flex   align-items-center">
                  <PiHeartLight className="icons" size={38} />
                  {posts.likes}
                  <span className="pop-icons">Likes</span>
                </div>
                <div className="icon-box  align-items-center d-flex">
                  <i
                    className="bi bi-chat  icons"
                    style={{ fontSize: "30px" }}
                  ></i>
                  {posts.commentsCount}
                  <span className="pop-icons">Comments</span>
                </div>
                <div className="icon-box d-flex align-items-center ">
                  <i
                    className="bi bi-repeat me-1 p-1 mb-1 icons"
                    style={{ fontSize: "30px" }}
                  ></i>
                  {posts.repostCount}
                  <span className="pop-icons">Repost</span>
                </div>
                <div className="icon-box d-flex align-items-center mt-1">
                  <RiSendInsLine className="icons mb-1" size={28} />
                  <span className="pop-icons">Send</span>
                </div>
                <div className="icon-box d-flex ms-auto">
                  <i
                    className="bi bi-bookmark ms-auto icons"
                    style={{ fontSize: "30px" }}
                  ></i>
                  <span className="pop-icons">Save</span>
                </div>
              </div>
              <div className="post d-flex align-items-center gap-2  ">
                <h6>{posts.user.username}</h6>
                <p className="mb-2">{posts.caption}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Feed;
