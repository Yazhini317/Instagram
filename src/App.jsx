import React, { useState } from "react";
import SideBar from "./components/SideBar";
import useFetch from "./components/useFetch";
import { Outlet } from "react-router-dom";
import instaopen from './assets/instaopen.gif'

function App() {
  const [opening,setOpening]=useState(true)
  useState(()=>{
  const timer = setTimeout(()=>{
    setOpening(false);
    clearTimeout(timer)
   },4000)
  },[])
 const {post}=useFetch("http://localhost:5000/suggestions")
 const user=post.map((users)=>{
 return users.user.username;
 })
 if(!localStorage.getItem('saved')){
  localStorage.setItem('saved',JSON.stringify([]))
 }
  return (
    <>
    {
      opening && (
        <div className="d-flex justify-content-center align-items-center vh-100">

          <img src={instaopen}   />
        </div>
      )
    }
    {
      !opening && (

      <div style={{overflowX:"hidden"}} className="d-flex vh-100">
        <div className="w-20 ">
        
            <SideBar user={user} />
            <div className="main-content">
            <Outlet/>

            </div>
         
        </div>
       
      </div>
      )
    }
      
    </>
  );
}

export default App;
