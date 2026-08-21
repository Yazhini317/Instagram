import React, { useState } from 'react'
import {Button, Grid, Paper, TextField, Typography} from '@mui/material'
import useFetch from './useFetch'
import { useNavigate } from 'react-router-dom'
function NewPost() {
    const {post,setPost}=useFetch("http://localhost:5000/posts")
 const [newPost,setNewPost]=useState(
         
      { "user":     {    
        "username": "",
        "name": "",
        "profileImage": "", 
        "following": false,
        "accountType": ""
      },
        "postImage": "",
        "caption": "",
        "timestamp": "",
        "repostCount":0,
        "commentCount":0,
        "likes": 125,
         }
 )

   const handleChange = (e) => {
  const { name, value } = e.target;
  const fieldName=name.split('user.')[1]
  if (name.startsWith('user.')) {
    setNewPost({
      ...newPost,
      user: {
        ...newPost.user,
        [fieldName]: value
      }
    });
  } else {
    setNewPost({
      ...newPost,
      [name]: value
    });
  }
};
 
const navigate=useNavigate()
 const handleCreatePost=()=>{
   const url = newPost.user.accountType === "public" ? 
    'http://localhost:5000/posts' : 'http://localhost:5000/PrivatePost';

     fetch(url,{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify(newPost)
     }) 

     .then((res) => res.json())
     .then((data) => {
       console.log("Created post:", data);
       setPost((prev)=>[...prev,data])
       if(newPost.user.accountType === "public"){
        navigate('/')
       }
       else{
        navigate('/PrivatePost')
       }
     })
     .catch((error)=>console.log(error))
  }


   


    return (
    <>
 

    <Paper elevation={18} style={{width:"400px",minHeight:"fit-content",textAlign:"center",margin:"auto",marginTop:"10px",padding:"10px"}}>
        <Typography  variant='h5'>Create New Post</Typography>
        <Grid component='form' style={{padding:"20px"}} className='d-flex flex-column gap-3'>
           
                <TextField name='user.username' value={newPost.user.username} label="Username" onChange={(e)=>handleChange(e)} fullWidth/>
                <TextField name='user.name' value={newPost.user.name} label="Name" onChange={(e)=>handleChange(e)} fullWidth/>
                <TextField name='user.profileImage' value={newPost.user.profileImage} label="Profile Image" onChange={(e)=>handleChange(e)} fullWidth/>
                <TextField name='timestamp' value={newPost.timestamp} label="TimeStamp" onChange={(e)=>handleChange(e)} fullWidth/>               
                <TextField name='postImage' value={newPost.postImage} label="Post Image" onChange={(e)=>handleChange(e)} fullWidth/>
                <TextField name='caption' value={newPost.caption} label="Caption" onChange={(e)=>handleChange(e)} fullWidth/>
                <TextField name='user.accountType' value={newPost.user.accountType} label="Account Type" onChange={(e)=>handleChange(e)} fullWidth/>
                 <Button variant='contained' onClick={handleCreatePost} >Create Post</Button>
        </Grid>
    </Paper>
   
    </>
  )
}

export default NewPost