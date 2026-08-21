import React, { useRef, useState, useEffect } from "react";
import { GoDotFill } from "react-icons/go";
import { useSelector } from "react-redux";
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
import { useDispatch } from "react-redux";
import { addLike, removeLike } from "./Store/LikedSlice";
import { FaBookmark } from "react-icons/fa";
import './likedPost.css'
const LikedPost = () => {
  const likedPage=useSelector((state)=>state.likedSlice)
   const navigate = useNavigate();

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
     dispatch(removeLike(id))
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

  const [click, setClick] = useState(null);
  
  const dispatch=useDispatch()
 const checkliked=useSelector((state)=>state.likedSlice)
 
    return (
    <div className=" likedContainer">
{
    likedPage.map((likePost)=>{
        return(
           
                        <div
                          key={likePost.id}
                          className="d-flex flex-column align-items-start p-3 ms-3 gap-2 postContainer  "
                        >
                          <div className="d-flex post gap-2 align-items-center">
                            <img
                              src={likePost.user.profileImage}
                              className="rounded-circle"
                              alt=""
                            />
                            <span style={{ fontSize: "12px" }}>
                              {likePost.user.username} <GoDotFill size={6} /> {likePost.timestamp}
                              {likePost.user.following ? (
                                <p className="following">Following</p>
                              ) : (
                                <p className="following" style={{ fontSize: "smaller" }}>
                                  Suggested for you
                                </p>
                              )}
                            </span>
                            {!likePost.user.following && (
                              <div className="post-follow d-flex ms-auto">
                                <Button style={{ fontSize: "10px" }} className="pe-2 ps-2">
                                  Follow
                                </Button>
                              </div>
                            )}
                            <div className="ms-auto">{<IoIosMore size={25} />}</div>
                          </div>
                          <img src={likePost.postImage} className="post " alt="" />
            
                          {/* Icons*/}
                          <div className="d-flex  post align-items-center justify-content-start ">
                            <div
                              className="icon-box d-flex align-items-center justify-content-center mt-1"
                              style={{ cursor: "pointer" }}
                            >
                            
                                <div>
                                  <PiHeartFill
                                    style={{ color: "red" }}
                                    className="icons"
                                    size={26}
                                    onClick={() => handleHeart(likePost.id)}
                                  />
                                  {Number(likePost.likes) + Liked}
                                </div>
                              
            
                              <span className="pop-icons">Likes</span>
                            </div>
            
                            {/* Comment icon */}
            
                           {/* COMMENT MODAL */}
            {click === likePost.id && expand && (
              <div className="commentExpand">
                
                <div className="commentModal">
            
                  {/* LEFT - POST IMAGE */}
                  <div className="commentPost">
                    <img src={likePost.postImage} alt="" />
                  </div>
            
                  {/* RIGHT - COMMENTS */}
                  <div className="comment">
            
                    <div className="commentHeader pt-2 d-flex gap-1  justify-content-start ps-2 ">
                      <img
                              src={likePost.user.profileImage}
                              className="rounded-circle"
                              alt=""
                            /><span>
                      <b className="ps-2 commentHeadername" style={{fontSize:"13px"}}>{likePost.user.username}</b></span>
                      <IoIosClose size={22} style={{cursor:"pointer"}} className="ms-auto" onMouseDown={()=>{setExpand(false)}} onClick={()=>{setExpand(false)}}/>
                    </div>
            
                    <div className="commentBody p-3 pt-2 ">
                     <img
                              src={likePost.user.profileImage}
                              className="rounded-circle "
                             
                            />
                <span><b className="ps-2 " style={{fontSize:"13px"}}>{likePost.user.username}</b>{" "}{likePost.caption}
                <p style={{fontSize:"10px",marginLeft:"50px",marginBottom:"10px",paddingBottom:"10px"}}>{likePost.timestamp}</p>
                </span>
                  
                   {likePost.comments?.map((comment) => (
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
                                  setClick(likePost.id);
                                  setExpand(true);
                                }}
                              ></i>
                              {likePost.commentsCount}
                              <span className="pop-icons">Comments</span>
                            </div>
            
                            <div className="icon-box d-flex align-items-center   ">
                              {click === likePost.id && repost ? (
                                <div>
                                   <i
                                className="bi bi-repeat me-1 p-1 mb-2 icons"
                                style={{ fontSize: "25px"}}
                                onClick={() => handleRepost(likePost.id)}
                              ></i>{Number(likePost.repostCount) + repost}
                                </div>
                              ) : (
                               <div>
                                   <i
                                className="bi bi-repeat me-1 p-1 mb-2 icons"
                                style={{ fontSize: "25px" }}
                                onClick={() => handleRepost(likePost.id)}
                              ></i>
                                 
                                  {likePost.repostCount}
                                </div>
                              )}
            
                             
                              {/* <i
                                className="bi bi-repeat me-1 p-1 mb-1 icons"
                                style={{ fontSize: "25px" }}
                              ></i>
                              {liked.repostCount} */}
                              <span className="pop-icons">Repost</span>
                            </div>
                            <div className="icon-box d-flex align-items-center mt-1">
                              <RiSendInsLine className="icons mb-1" size={22} />
                              <span className="pop-icons">Send</span>
                            </div>
                            <div className="icon-box d-flex ms-auto">
                           
                                <FaBookmark  />

                            
                                
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
                                {likePost.user.username}
                              </span>
                              <span className="ms-2">{likePost.caption}</span>
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
        )
   
   
  
}

export default LikedPost