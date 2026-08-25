import React, { useRef, useState, useEffect } from "react";
import { GoDotFill } from "react-icons/go";
import useFetch from "./useFetch";
import { IoIosMore } from "react-icons/io";
import { PiHeartFill, PiHeartLight } from "react-icons/pi";
import { RiSendInsLine } from "react-icons/ri";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Feed.css";
import { IoIosClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { addSaved, removeSaved } from "./Store/SavedSlice";
import { FaBookmark } from "react-icons/fa";
import { addLike, removeLike } from "./Store/LikedSlice";
import { Nav, NavDropdown } from "react-bootstrap";

function Feed() {
  const navigate = useNavigate();
const [menuOpen,setMenuOpen]=useState(null)
  const [story, setStory] = useState([]);

  useEffect(() => {
    fetch("https://instagram-project-oybk.onrender.com/stories")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Data not found");
        } else {
          return res.json();
        }
      })
      .then((data) => setStory(data))
      .catch((error) => console.log(error.message));
  }, []);

  const { post } = useFetch("https://instagram-project-oybk.onrender.com/posts");

  const [showLeft, setLeft] = useState(false);
  const [showRight, setRight] = useState(true);

  
  const checkLiked = useSelector((state) => state.likedSlice);

  const dispatch = useDispatch();

  const handleHeart = (posts) => {
    const checkLikedstory = checkLiked.some(
      (checkLike) => checkLike.id === posts.id
    );

    if (!checkLikedstory) {
      dispatch(addLike(posts));
    } else {
      dispatch(removeLike(posts.id));
    }
  };
  
  const [rePost, setRepost] = useState(false);
  const handleRePost = (id) => {
    setClick(id);
    setRepost(true)
    if (rePost) {
      setRepost(false);
    } else {
      setRepost(true);
    }
  };

  const [expand, setExpand] = useState(false);

  const storyRef = useRef();

  const checkScroll = () => {
    const element = storyRef.current;

    if (!element) return;

    setLeft(element.scrollLeft > 0);

    setRight(
      element.scrollLeft + element.clientWidth <
        element.scrollWidth - 1
    );
  };

  const storyScrollRight = () => {
    if (!storyRef.current) return;

    storyRef.current.scrollBy({
      left: storyRef.current.clientWidth,
      behavior: "smooth",
    });

    setTimeout(() => {
      checkScroll();
    }, 300);
  };

  const storyScrollLeft = () => {
    
    if (!storyRef.current) return;

    storyRef.current.scrollBy({
      left: -storyRef.current.clientWidth,
      behavior: "smooth",
    });

    setTimeout(checkScroll, 300);
  };

  const [click, setClick] = useState(null);

  const handleStoryClick = (id) => {
    setClick(id);
    navigate(`/ViewStory/${id}`)
    // setTimeout(() => {
    //   navigate(`/ViewStory/${id}`);
    // }, 2000);
  };

  useEffect(() => {
    if (story.length > 0) {
      setTimeout(() => {
        checkScroll();
      }, 100);
    }
  }, [story]);

  useEffect(() => {
    const element = storyRef.current;

    if (!element) return;

    element.addEventListener("scroll", checkScroll);

    return () => {
      element.removeEventListener("scroll", checkScroll);
    };
  }, [story]);

  const checkSaved = useSelector((state) => state.saved);

  const handleSaved = (posts) => {
    setClick(posts.id);

    const checkSavedstory = checkSaved.some(
      (checkstory) => checkstory.id === posts.id
    );

    if (!checkSavedstory) {
      dispatch(addSaved(posts));
    } else {
      dispatch(removeSaved(posts.id));
    }
  };

  const handleDelete = (id) => {
    fetch(`https://instagram-project-oybk.onrender.com/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Data not Found");
        }

        /*
          useFetch is providing post data,
          so reload is used here to show the
          deleted post removed from the feed.
        */
        window.location.reload();
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <>
      <div className="story smallstory">

        {/* ONLY STORIES SCROLL */}

        <div ref={storyRef} className="story-container">
          {story.map((storys) => (
            <div
              className="story-item"
              key={storys.id}
              onClick={() => {
                handleStoryClick(storys.id);
              }}
            >
              <div
                className={
                  click === storys.id
                    ? "story-loader story-progress"
                    : "story-loader"
                }
              >
                <img
                  src={storys.profileImage}
                  className="story-image"
                 
                  alt=""
                />
              </div>
            </div>
          ))}
        </div>

        {/* LEFT ARROW */}

        {showLeft && (
          <button
            className="story-arrow-left"
            onClick={()=>{
             
              storyScrollLeft()}}
          >
            <i className="bi bi-chevron-left"></i>
          </button>
        )}

        {/* RIGHT ARROW */}

        {showRight && (
          <button
            className="story-arrow"
            onClick={()=>{
              
              storyScrollRight()
            }
          }
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        )}
      </div>

      {/* POSTS */}

      <div className="flex-column">
        {post.map((posts) => {
          return (
            <div
              key={posts.id}
              className="d-flex flex-column align-items-center p-3 ms-3 gap-2 storyContainer"
            >
              <div className="d-flex story gap-2 align-items-center">

                <img
                  src={posts.user.profileImage}
                  className="rounded-circle post-profile"
              
                  alt=""
                />

                <span
                  style={{ fontSize: "12px" }}
                  className="mt-3"
                >
                 {posts.user.username}{" "}
                  <GoDotFill size={6} /> {posts.timestamp}

                  {posts.user.following ? (
                    <p className="following">
                      Following
                    </p>
                  ) : (
                    <p
                      className="following"
                      style={{ fontSize: "smaller" }}
                    >
                      Suggested for you
                    </p>
                  )}
                </span>

                {!posts.user.following && (
                  <div className="story-follow d-flex">
                    <Button
                      style={{ fontSize: "10px" }}
                      className="pe-2 ps-2"
                    >
                      Follow
                    </Button>
                  </div>
                )}

                <Nav className="ms-auto sidebar-dropdown">
  <NavDropdown
    title={
      <IoIosMore
        size={25}
        style={{ color: "black" }}
      />
    }
  >
    <NavDropdown.Item
      onClick={() => {
        handleDelete(posts.id);
      }}
    >
      Delete
    </NavDropdown.Item>
  </NavDropdown>
</Nav>
</div>
              <img
                src={posts.postImage}
                className="post"
                alt=""
              />

              {/* Icons */}

              <div className="d-flex story align-items-center justify-content-start">

                {/* LIKE */}

                <div
                  className="icon-box d-flex align-items-center justify-content-center mt-1"
                  style={{ cursor: "pointer" }}
                >
                  {checkLiked.some(
                    (likedstory) =>
                      likedstory.id === posts.id
                  ) ? (
                    <div>
                      <PiHeartFill
                        style={{ color: "red" }}
                        className="icons"
                        size={26}
                        onClick={() =>
                          handleHeart(posts)
                        }
                      />

                      {Number(posts.likes) + 1}
                    </div>
                  ) : (
                    <div>
                      <PiHeartLight
                        className="icons"
                        size={26}
                        onClick={() =>
                          handleHeart(posts)
                        }
                      />

                      {posts.likes}
                    </div>
                  )}

                  <span className="pop-icons">
                    Likes
                  </span>
                </div>

                {/* COMMENT MODAL */}

                {click === posts.id && expand && (
                  <div className="commentExpand">

                    <div className="commentModal">

                      {/* LEFT - POST IMAGE */}

                      <div className="commentPost">
                        <img
                          src={posts.postImage}
                          alt=""
                        />
                      </div>

                      {/* RIGHT - COMMENTS */}

                      <div className="comment">

                        <div className="commentHeader pt-2 d-flex gap-1 justify-content-start ps-2">

                          <img
                            src={posts.user.profileImage}
                            className="rounded-circle"
                            alt=""
                          />

                          <span>
                            <b
                              className="ps-2 commentHeadername"
                              style={{
                                fontSize: "13px",
                              }}
                            >
                              {posts.user.username}
                            </b>
                          </span>

                          <IoIosClose
                            size={22}
                            style={{ cursor: "pointer" }}
                            className="ms-auto"
                            onMouseDown={() => {
                              setExpand(false);
                            }}
                            onClick={() => {
                              setExpand(false);
                            }}
                          />

                        </div>

                        <div className="commentBody p-3 pt-2">

                          <img
                            src={posts.user.profileImage}
                            className="rounded-circle"
                            alt=""
                          />

                          <span>
                            <b
                              className="ps-2"
                              style={{
                                fontSize: "13px",
                              }}
                            >
                              {posts.user.username}
                            </b>{" "}
                            {posts.caption}

                            <p
                              style={{
                                fontSize: "10px",
                                marginLeft: "50px",
                                marginBottom: "10px",
                                paddingBottom: "10px",
                              }}
                            >
                              {posts.timestamp}
                            </p>
                          </span>

                          {posts.comments?.map(
                            (comment) => (
                              <div
                                key={comment.id}
                                className="d-flex align-items-start mb-3"
                              >
                                <img
                                  src={comment.profileImage}
                                  className="rounded-circle"
                                  alt=""
                                />

                                <span>
                                  <b
                                    className="ps-2"
                                    style={{
                                      fontSize: "13px",
                                    }}
                                  >
                                    {comment.username}
                                  </b>{" "}
                                  {comment.comment}
                                </span>
                              </div>
                            )
                          )}

                        </div>

                        <div className="commentBottom mb-3 ps-4">

                          <input
                            type="text"
                            placeholder="Add a comment..."
                          />

                          <button>
                            Post
                          </button>

                        </div>

                      </div>
                    </div>
                  </div>
                )}

                {/* COMMENT */}

                <div className="icon-box align-items-center d-flex">

                  <i
                    className="bi bi-chat icons"
                    style={{ fontSize: "25px" }}
                    onClick={() => {
                      setClick(posts.id);
                      setExpand(true);
                    }}
                  ></i>

                  {posts.commentsCount}

                  <span className="pop-icons">
                    Comments
                  </span>

                </div>

                {/* REPOST */}

                <div className="icon-box d-flex align-items-center">

                  {click === posts.id && rePost ? (
                    <div>

                      <i
                        className="bi bi-repeat me-1 p-1 mb-2 icons"
                        style={{ fontSize: "25px" }}
                        onClick={() =>
                          handleRePost(posts.id)
                        }
                      ></i>

                      {Number(posts.repostCount) + 1}

                    </div>
                  ) : (
                    <div>

                      <i
                        className="bi bi-repeat me-1 p-1 mb-2 icons"
                        style={{ fontSize: "25px" }}
                        onClick={() =>
                          handleRePost(posts.id)
                        }
                      ></i>

                      {posts.repostCount || 0}

                    </div>
                  )}

                  <span className="pop-icons">
                    Repost
                  </span>

                </div>

                {/* SEND */}

                <div className="icon-box d-flex align-items-center mt-1">

                  <RiSendInsLine
                    className="icons mb-1"
                    size={22}
                  />

                  <span className="pop-icons">
                    Send
                  </span>

                </div>

                {/* SAVE */}

                <div className="icon-box d-flex ms-auto">

                  {checkSaved.some(
                    (savedstory) =>
                      savedstory.id === posts.id
                  ) ? (
                    <FaBookmark
                      style={{ fontSize: "21px" }}
                      className="ms-auto icons"
                      onClick={() => {
                        handleSaved(posts);
                      }}
                    />
                  ) : (
                    <i
                      className="bi bi-bookmark ms-auto icons"
                      style={{ fontSize: "21px" }}
                      onClick={() => {
                        handleSaved(posts);
                      }}
                    ></i>
                  )}

                  <span className="pop-icons">
                    Save
                  </span>

                </div>
              </div>

              {/* CAPTION */}

              <div
                className="story mb-3"
                style={{ fontSize: "13px" }}
              >
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: "600",
                    marginRight: "5px",
                  }}
                  className=""
                >
                  <span
                    style={{ fontWeight: "bold" }}
                  >
                    {posts.user.username}
                  </span>

                  <span className="ms-2">
                    {posts.caption}
                  </span>
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