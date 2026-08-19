import React from 'react'
import {useState} from 'react'
import './Message.css'
import profilepic from '../assets/profile-dp.jpeg'
import useFetch from './useFetch'
import {IoChevronDown} from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { Grid, TextField } from '@mui/material';
import { RiSendPlaneLine } from "react-icons/ri";
function Message() {
  
   const {post,setPost}=useFetch('http://localhost:5000/posts')
  return (
    <>
    <div className='message-page'>
    <div className='messagecontainer '>
    <div className='fw-bold userMsgname'>ya_zh_u  <span>
                          <IoChevronDown />
                        </span></div>
    <div className='fs-4 mt-1 ms-auto pe-3'><FaEdit /></div>
   <Grid className="searchbox">
     <TextField placeholder='search' sx={{
        "& .MuiOutlinedInput-root": {
            borderRadius: "30px",
            height:"40px"
        },
    }} type='search' fullWidth/>
   </Grid>
   <img src={profilepic} className="mesgimage rounded-circle " />
    <div className='message'>Messages
    </div>
<div className='msgreq' style={{fontSize:"12px",color:"gray",cursor:"pointer"}}> Requests</div>
   <div className='fw-bold'>Accounts to Follow</div>
    <div className="message-list" >
    {
        post.map((message)=>{
            return(
                <>
                <div key={message.id}  >
                    <div className='d-flex  messagefollowing' >
                  <img src={message.user.profileImage} className='rounded-circle sug-dp p-2 ' />
                  <h6 className='mt-2  username'>{message.user.username}</h6>
                   <h6 className='text-primary ms-auto d-flex  align-items-center' style={{fontSize:"12px"}}>Follow</h6>
                  </div>

                </div>
                </>
            )
        })
    }
    </div>
    <div>

    </div>

  
    </div>
<div className="right-message">
   
   <div className="message-icon">
      <RiSendPlaneLine size={50} />
   </div>

   <h3>Your messages</h3>

   <p>Send private photos and messages to a friend or group.</p>

   <button>Send message</button>
</div>
    
</div>

    </>
  )
}

export default Message