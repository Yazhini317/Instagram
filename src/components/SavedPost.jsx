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
import { addSaved, removeSaved } from "./Store/SavedSlice";
import { FaBookmark } from "react-icons/fa";
const SavedPost = () => {
  const savedPage=useSelector((state)=>state.saved)
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
 const checkSaved=useSelector((state)=>state.saved)
  const handleSaved=(saves)=>{
    
      dispatch(removeSaved(saves.id))
    
  }
    return (
    <div className="saved-post-grid">
{
    savedPage.map((saved)=>{
        return(
           
                        <div
                          key={saved.id}
                          className=" postContainer"
                        >
                          <div className="post">
                            <img 
                              src={saved.user.profileImage}
                              className="rounded-circle"
                              alt=""
                            />
                            <span style={{ fontSize: "12px" }} className="">
                              {saved.user.username} <GoDotFill size={6} /> {saved.timestamp}
                              {saved.user.following ? (
                                <p className="following">Following</p>
                              ) : (
                                <p className="following" style={{ fontSize: "smaller" }}>
                                  Suggested for you
                                </p>
                              )}
                            </span>
                            {!saved.user.following && (
                              <div className="post-follow d-flex ms-auto">
                                <Button style={{ fontSize: "10px" }} className="">
                                  Follow
                                </Button>
                              </div>
                            )}
                            <div className="ms-auto">{<IoIosMore size={25} />}</div>
                          </div>
                          <img src={saved.postImage} className="post " alt="" />
            
                          {/* Icons*/}
                          <div className="d-flex  post align-items-center justify-content-start ">
                            <div
                              className="icon-box d-flex align-items-center justify-content-center mt-1"
                              style={{ cursor: "pointer" }}
                            >
                              {click === saved.id && Liked ? (
                                <div>
                                  <PiHeartFill
                                    style={{ color: "red" }}
                                    className="icons"
                                    size={26}
                                    onClick={() => handleHeart(saved.id)}
                                  />
                                  {Number(saved.likes) + Liked}
                                </div>
                              ) : (
                                <div>
                                  <PiHeartLight
                                    className="icons "
                                    size={26}
                                    onClick={() => handleHeart(saved.id)}
                                  />
                                  {saved.likes}
                                </div>
                              )}
            
                              <span className="pop-icons">Likes</span>
                            </div>
            
                            {/* Comment icon */}
            
                           {/* COMMENT MODAL */}
            {click === saved.id && expand && (
              <div className="commentExpand">
                
                <div className="commentModal">
            
                  {/* LEFT - POST IMAGE */}
                  <div className="commentPost">
                    <img src={saved.postImage} alt="" />
                  </div>
            
                  {/* RIGHT - COMMENTS */}
                  <div className="comment">
            
                    <div className="commentHeader pt-2 d-flex gap-1  justify-content-start ps-2 ">
                      <img
                              src={saved.user.profileImage}
                              className="rounded-circle"
                              alt=""
                            /><span>
                      <b className="ps-2 commentHeadername" style={{fontSize:"13px"}}>{saved.user.username}</b></span>
                      <IoIosClose size={22} style={{cursor:"pointer"}} className="ms-auto" onMouseDown={()=>{setExpand(false)}} onClick={()=>{setExpand(false)}}/>
                    </div>
            
                    <div className="commentBody p-3 pt-2 ">
                     <img
                              src={saved.user.profileImage}
                              className="rounded-circle "
                             
                            />
                <span><b className="ps-2 " style={{fontSize:"13px"}}>{saved.user.username}</b>{" "}{saved.caption}
                <p style={{fontSize:"10px",marginLeft:"50px",marginBottom:"10px",paddingBottom:"10px"}}>{saved.timestamp}</p>
                </span>
                  
                   {saved.comments?.map((comment) => (
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
                                  setClick(saved.id);
                                  setExpand(true);
                                }}
                              ></i>
                              {saved.commentsCount}
                              <span className="pop-icons">Comments</span>
                            </div>
            
                            <div className="icon-box d-flex align-items-center   ">
                              {click === saved.id && repost ? (
                                <div>
                                   <i
                                className="bi bi-repeat me-1 p-1 mb-2 icons"
                                style={{ fontSize: "25px"}}
                                onClick={() => handleRepost(saved.id)}
                              ></i>{Number(saved.repostCount) + repost}
                                </div>
                              ) : (
                               <div>
                                   <i
                                className="bi bi-repeat me-1 p-1 mb-2 icons"
                                style={{ fontSize: "25px" }}
                                onClick={() => handleRepost(saved.id)}
                              ></i>
                                 
                                  {saved.repostCount}
                                </div>
                              )}
            
                             
                              {/* <i
                                className="bi bi-repeat me-1 p-1 mb-1 icons"
                                style={{ fontSize: "25px" }}
                              ></i>
                              {saved.repostCount} */}
                              <span className="pop-icons">Repost</span>
                            </div>
                            <div className="icon-box d-flex align-items-center mt-1">
                              <RiSendInsLine className="icons mb-1" size={22} />
                              <span className="pop-icons">Send</span>
                            </div>
                            <div className="icon-box d-flex ms-auto">
                           
                                <FaBookmark onClick={()=>{
                                      handleSaved(saved)
                                }} />

                            
                                
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
                                {saved.user.username}
                              </span>
                              <span className="ms-2">{saved.caption}</span>
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
        )
   
   
  
}

export default SavedPost