import React, { useRef, useState, useEffect } from "react";
import { GoDotFill } from "react-icons/go";
import useFetch from "./useFetch";
import { IoIosMore } from "react-icons/io";
import { PiHeartLight } from "react-icons/pi";
import { FiMessageCircle } from "react-icons/fi";
import { BiRepost } from "react-icons/bi";
import { RiSendInsLine } from "react-icons/ri";
import { Button } from "react-bootstrap";
import { IoIosArrowDropright } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { OrbitProgress } from "react-loading-indicators";
import './Feed.css'


function PrivatePost() {
    const {post,setPost}=useFetch("http://localhost:5000/PrivatePost")
    const navigate = useNavigate();
  return (
     <>
        <div className="privPost">
             {post.map((posts) => {
                      return (
                        <div
                          key={posts.id}
                          className="d-flex flex-column align-items-center p-3 ms-3 gap-2 postContainer"
                        >
                          <div className="d-flex post gap-2 align-items-center">
                            <img
                              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
                              className="rounded-circle"
                              alt=""
                            />
                            <span style={{ fontSize: "12px" }} className="">
                              <b>ya_zh_u</b> <GoDotFill size={6} /> {posts.timestamp}
                             
                            </span>
                           
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
                    })
                  
                  }
                  </div>
                  </>
                  )
                  }
                  

export default PrivatePost