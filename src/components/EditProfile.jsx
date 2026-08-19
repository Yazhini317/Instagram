import React,{useState,useEffect} from 'react'
import "./Profile.css";
import './Editprofile.css'
import profilepic from '../assets/profile-dp.jpeg'
import { Button } from 'react-bootstrap';
import {Grid, TextareaAutosize, TextField, Typography} from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
function EditProfile (){
    const {username} =useParams()
    const navigate=useNavigate()
      const [profile, setProfile] = useState([]);
       useEffect(() => {
          fetch("http://localhost:5000/suggestions")
            .then((res) => {
              if (res.ok) {
                return res.json();
              } else {
                throw new Error("Data Not Found");
              }
            })
            .then((data) => {setProfile(data)
                
        setBio(data[0]?.bio || "");
            })
            .catch((error) => console.log(error));
        }, []);
        const [bio,setBio]=useState("")
        const handleSubmit=()=>{
            fetch('http://localhost:5000/suggestions/1',{
                method:"PATCH",
                headers:{
                   "Content-Type" : "application/json"
                },
                body:JSON.stringify({
                    
                    bio:bio,
                    
                })
            })
            .then((res)=>res.json())
            .then((data)=>{
                
                console.log(data)
                
               
                navigate(`/${username}`)
            })
            .catch((error)=>console.log(error))
        }
     
  return (
    <>
    <div className='d-flex flex-column  p-5 gap-3 '>
        <h4 className='vw-100 fw-bold'>Edit Profile</h4>
               <div className='sugtcontainer mt-2 d-flex flex-column ms-5 ps-2'>
       <div className='pt-3 ps-3 editprof  d-flex  align-items-center'>
          <img src={profilepic} className="me-2 mb-3 sugstImage  w-15 rounded-circle " />
          <div className=' d-flex  my-profile'>
          {
           profile.map((profInfo)=>{
             return(
               <div key={profInfo.id} className='profile-info d-flex mb-4 flex-column mt-1'>
                 <h6 className='username m-0 '>{profInfo.user.username}</h6>
                 <p className='mb-2 p-0'>{profInfo.user.name}</p>
                 
                 <p className='mb-2 p-0'>{bio}</p>
                 
                 </div>
           
             )
           })
          }
          </div>
          <Button  className=' ms-auto mt-2 mb-4 me-3' >Change Photo</Button>
       </div>
      <div style={{padding:"20px",marginTop:"20px",width:"600px",display:"flex",flexDirection:"column", position:"relative",gap:"10px"}} >
                <Typography variant='h6' style={{fontWeight:"bold",marginLeft:"5px"}}>Bio</Typography>
               <TextareaAutosize
          minRows={2}
          maxRows={2}
          maxLength={150}
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          style={{
           
            width: "100%",
            padding: "14px 16px 30px",
            border: "1px solid #d0d5dd",
            borderRadius: "12px",
            resize: "none",
            fontSize: "14px",
            fontFamily: "inherit",
            outline: "none",
          }}
        />

        <span
          style={{
            position: "absolute",
            right: "30px",
            bottom: "75px",
            fontSize: "12px",
            color: "#667085",
          }}
        >
          {bio.length} / 150
        </span>
        {
            bio.length === 0 ? (

                <Button disabled>Submit</Button>
            ):
            (
                <Button onClick={handleSubmit} >Submit</Button>

            )
        }
      </div>
    </div>
                
      
       </div>
       
       
    
    </>
  )
}

export default EditProfile