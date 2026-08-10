import React, { useEffect,useState } from 'react'
import useFetch from './useFetch'
import profile from "../assets/profile-dp.jpeg";
import { Button } from 'react-bootstrap';
function Suggestions() {
  const {post,setError}=useFetch( "http://localhost:5000/posts")
  const [suggest,setSuggest]=useState([])
  useEffect(()=>{
    fetch("http://localhost:5000/suggestions")
    .then((res)=>{
      if(res.ok){
        return res.json()
      }
      else{
        throw new Error("Data not Found")
      }
    })
    .then((data)=>setSuggest(data))
    .catch((error)=> setError(error))
  })
  return (
    <div className='sugtcontainer mt-2 d-flex flex-column'>
    <div className='pt-3 ps-3 d-flex  align-items-center'>
       <img src={profile} className="me-2 sugstImage  w-15 rounded-circle " />
       <div className=' d-flex  my-profile'>
       {
        suggest.map((profInfo)=>{
          return(
            <div  className='profile-info d-flex flex-column mt-1'>
              <h6 className='username m-0'>{profInfo.user.username}</h6>
              <p className='mb-2 p-0'>{profInfo.user.name}</p>
              </div>
          )
        })
       }
       </div>
       <p className='text-primary ms-auto mt-2'>Switch</p>
    </div>
      <div className='d-flex  ps-3 mt-2 '>
       <h6>Suggested for you</h6>
       <span className='ms-auto'>See all</span>
      </div>
     <div className=' d-flex flex-column ps-2'>
      {
        post.map((posts)=>{
          return(
            <div key={posts.id}>
              {
                !posts.user.following && (
                  <div className='d-flex'>
                  <img src={posts.user.profileImage} className='rounded-circle sug-dp p-2 ' />
                  <h6 className='mt-2 p-2 username'>{posts.user.username}</h6>
                   <p className='text-primary ms-auto mt-3'>Follow</p>
                  </div>
                )
              }
            </div>
          )
        })
      }
     </div>
      
    </div>
  )
}

export default Suggestions