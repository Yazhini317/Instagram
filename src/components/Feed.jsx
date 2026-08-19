import React, { useRef, useState, useEffect } from "react";
import { GoDotFill } from "react-icons/go";
import useFetch from "./useFetch";
import { IoIosMore } from "react-icons/io";
import { PiHeartFill, PiHeartLight } from "react-icons/pi";
import { FiMessageCircle } from "react-icons/fi";
import { BiRepost } from "react-icons/bi";
import { RiSendInsLine } from "react-icons/ri";
import { Button } from "react-bootstrap";
import { IoIosArrowDropright } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { OrbitProgress } from "react-loading-indicators";
import "./Feed.css";
import { IoIosClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { addSaved, removeSaved } from "./Store/SavedSlice";
import {FaBookmark} from "react-icons/fa"
function Feed() {
  
  const navigate = useNavigate();

  const { post, setPost, error, setError, isLoading } = useFetch(
    "http://localhost:5000/posts",
  );
  const [showLeft, setLeft] = useState(false);
  const [showRight, setRight] = useState(true);

  {
    /* Like icon */
  }
  const [repost,setRepost]=useState(false)
  const [Liked, setLiked] = useState(false);
  const [heartCount, setHeartCount] = useState(0);
  const [repostedCount,setReposted]=useState(0);
  const handleHeart = (id) => {
    setClick(id);
    setHeartCount((prev) => prev + 1);
    if (Liked) {
      setLiked(false);
    } else {
      setLiked(true);
    }
  };
  const handleRepost = (id) => {
    setClick(id);
    setReposted((prev) => prev + 1);
    if (repost) {
      setRepost(false);
    } else {
      setRepost(true);
    }
  };
  {
    /* Comment icon */
  }

  const [expand, setExpand] = useState(false);

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
  useEffect(() => {
    checkScroll();
  }, [post]);

  const [click, setClick] = useState(null);
  const handleStoryClick = (id) => {
    setClick(id);

    setTimeout(() => {
      navigate(`/ViewStory/${id}`);
    }, 2000);
  };
  const dispatch=useDispatch()
 
 const checkSaved=useSelector((state)=>state.saved)
 const handleSaved=(posts)=>{
    setClick(posts.id)
    
    const checkSavedPost=checkSaved.some((checkPost)=>checkPost.id === posts.id)
    
    if(!checkSavedPost){
      dispatch(addSaved(posts))
    }
    else{
      dispatch(removeSaved(posts.id))
    }
  }
  return (
    <>
      <div className="story smallstory">
        {/* ONLY STORIES SCROLL */}
        <div ref={storyRef} className="story-container">
          {post
            .filter((posts) => posts.user.following)
            .map((posts) => (
              <div
                className="story-item"
                key={posts.id}
                onClick={() => {
                  handleStoryClick(posts.id);
                }}
              >
                <div
                  className={
                    click === posts.id
                      ? "story-loader story-progress "
                      : " story-loader"
                  }
                >
                  <img
                    src={posts.user.profileImage}
                    className="story-image"
                    alt=""
                  />
                </div>
              </div>
            ))}
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

      {/*  POST  */}

      <div className="flex-column">
        {post.map((posts) => {
          return (
            <div
              key={posts.id}
              className="d-flex flex-column align-items-center p-3 ms-3 gap-2 postContainer"
            >
              <div className="d-flex post gap-2 align-items-center">
                <img
                  src={posts.user.profileImage}
                  className="rounded-circle"
                  alt=""
                />
                <span style={{ fontSize: "12px" }} className="">
                  {posts.user.username} <GoDotFill size={6} /> {posts.timestamp}
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
                    <Button style={{ fontSize: "10px" }} className="pe-2 ps-2">
                      Follow
                    </Button>
                  </div>
                )}
                <div className="ms-auto">{<IoIosMore size={25} />}</div>
              </div>
              <img src={posts.postImage} className="post " alt="" />

              {/* Icons*/}
              <div className="d-flex  post align-items-center justify-content-start ">
                <div
                  className="icon-box d-flex align-items-center justify-content-center mt-1"
                  style={{ cursor: "pointer" }}
                >
                  {click === posts.id && Liked ? (
                    <div>
                      <PiHeartFill
                        style={{ color: "red" }}
                        className="icons"
                        size={26}
                        onClick={() => handleHeart(posts.id)}
                      />
                      {Number(posts.likes) + Liked}
                    </div>
                  ) : (
                    <div>
                      <PiHeartLight
                        className="icons "
                        size={26}
                        onClick={() => handleHeart(posts.id)}
                      />
                      {posts.likes}
                    </div>
                  )}

                  <span className="pop-icons">Likes</span>
                </div>

                {/* Comment icon */}

               {/* COMMENT MODAL */}
{click === posts.id && expand && (
  <div className="commentExpand">
    
    <div className="commentModal">

      {/* LEFT - POST IMAGE */}
      <div className="commentPost">
        <img src={posts.postImage} alt="" />
      </div>

      {/* RIGHT - COMMENTS */}
      <div className="comment">

        <div className="commentHeader pt-2 d-flex gap-1  justify-content-start ps-2 ">
          <img
                  src={posts.user.profileImage}
                  className="rounded-circle"
                  alt=""
                /><span>
          <b className="ps-2 commentHeadername" style={{fontSize:"13px"}}>{posts.user.username}</b></span>
          <IoIosClose size={22} style={{cursor:"pointer"}} className="ms-auto" onMouseDown={()=>{setExpand(false)}} onClick={()=>{setExpand(false)}}/>
        </div>

        <div className="commentBody p-3 pt-2 ">
         <img
                  src={posts.user.profileImage}
                  className="rounded-circle "
                 
                />
    <span><b className="ps-2 " style={{fontSize:"13px"}}>{posts.user.username}</b>{" "}{posts.caption}
    <p style={{fontSize:"10px",marginLeft:"50px",marginBottom:"10px",paddingBottom:"10px"}}>{posts.timestamp}</p>
    </span>
      
       {posts.comments?.map((comment) => (
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
      <b className="ps-2" style={{ fontSize: "13px" }}>
        {comment.username}
      </b>{" "}
      {comment.comment}
    </span>
  </div>
))}
        
       
        </div>

        <div className="commentBottom mb-3 ps-4">
          <input
            type="text"
            placeholder="Add a comment..."
          />
          <button>Post</button>
        </div>

      </div>

    </div>

  </div>
)}

                <div className="icon-box  align-items-center d-flex">
                  <i
                    className="bi bi-chat  icons"
                    style={{ fontSize: "25px" }}
                    onClick={() => {
                      setClick(posts.id);
                      setExpand(true);
                    }}
                  ></i>
                  {posts.commentsCount}
                  <span className="pop-icons">Comments</span>
                </div>

                <div className="icon-box d-flex align-items-center   ">
                  {click === posts.id && repost ? (
                    <div>
                       <i
                    className="bi bi-repeat me-1 p-1 mb-2 icons"
                    style={{ fontSize: "25px"}}
                    onClick={() => handleRepost(posts.id)}
                  ></i>{Number(posts.repostCount) + repost}
                    </div>
                  ) : (
                   <div>
                       <i
                    className="bi bi-repeat me-1 p-1 mb-2 icons"
                    style={{ fontSize: "25px" }}
                    onClick={() => handleRepost(posts.id)}
                  ></i>
                     
                      {posts.repostCount}
                    </div>
                  )}

                 
                  {/* <i
                    className="bi bi-repeat me-1 p-1 mb-1 icons"
                    style={{ fontSize: "25px" }}
                  ></i>
                  {posts.repostCount} */}
                  <span className="pop-icons">Repost</span>
                </div>
                <div className="icon-box d-flex align-items-center mt-1">
                  <RiSendInsLine className="icons mb-1" size={22} />
                  <span className="pop-icons">Send</span>
                </div>
                <div className="icon-box d-flex ms-auto">
                  {
                    checkSaved.some((savedPost) => savedPost.id === posts.id) ? (
                      <FaBookmark  style={{ fontSize: "21px" }} className="ms-auto icons" onClick={()=>{setClick(null);
                        handleSaved(posts)
                        
                      }} />
                    ) : (
                      
                      <i
                        className="bi bi-bookmark ms-auto icons"
                        style={{ fontSize: "21px" }}
                        onClick={()=>{handleSaved(posts)}}
                      ></i>
                    )
                  }
                  <span className="pop-icons">Save</span>
                </div>
              </div>
              <div className="post mb-3 " style={{ fontSize: "13px" }}>
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: "600",
                    marginRight: "5px",
                  }}
                  className=""
                >
                  <span style={{ fontWeight: "bold" }}>
                    {posts.user.username}
                  </span>
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
