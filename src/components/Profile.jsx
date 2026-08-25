import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Profile.css";
import { SiThreads } from "react-icons/si";
import { IoSettingsOutline } from "react-icons/io5";
import { IoChevronDown } from "react-icons/io5";
import { PiPlusCircleDuotone } from "react-icons/pi";
import { PiDotsNineBold } from "react-icons/pi";
import { FaRegBookmark } from "react-icons/fa";
import { IoCameraOutline } from "react-icons/io5";
import useFetch from "./useFetch";
import { useDispatch, useSelector } from "react-redux";
function Profile() {
  const { username } = useParams();
  const [profile, setProfile] = useState([]);
  const [postCount, setPostcount] = useState(0);
  const [followCount, setFollowcount] = useState(100);
  const [followerCount, setFollowercount] = useState(230);
  const [menupost,setMenupost]=useState(true);
  const [savedpost,setSavedpost]=useState(false);
  const savingPost=useSelector((state)=>state.saved) || [];

 

  useEffect(() => {
    fetch("https://instagram-project-oybk.onrender.com/suggestions")
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Data Not Found");
        }
      })
      .then((data) => setProfile(data))
      .catch((error) => console.log(error));
  }, []);

  const [bioprofile, setBioProfile] = useState(null);

useEffect(() => {
  fetch("https://instagram-project-oybk.onrender.com/suggestions/1")
    .then((res) => res.json())
    .then((data) => setBioProfile(data))
    .catch((error) => console.log(error));
}, []);

  const {post,setPost}=useFetch("https://instagram-project-oybk.onrender.com/PrivatePost")
  const navigate=useNavigate()
  return (
    <>
      <div className="profile">
        <div className="profile-top">
          <div className="profile-mobile-icons">
            <div className="profile-settings">
              <i className="bi bi-gear-wide fs-2 mb-4 "></i>
            </div>
            <div>
              {profile.map((prof) => {
                return (
                  <div key={prof.id}>
                    {prof.user.username}{" "}
                    <span>
                      <IoChevronDown />
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="profile-threads">
              <SiThreads size={25} />
            </div>
          </div>
        </div>
        {profile.map((prof) => {
          return (
            <React.Fragment key={prof.id}>
              <div  className="profile-container">
                <div className="d-flex profilepage">
                  <img
                    src={prof.user.profileImage}
                    className="rounded-circle profile-img me-2"
                  />
                  <div className="profile-info">
                    <div className="profile-name-row">
                      <h3 className="prof-name">{prof.user.username}</h3>

                      <div className="profile-settings-desktop">
                        <i className="bi bi-gear-wide gearsmall fs-4"></i>
                      </div>
                    </div>

                    <div className="name">{prof.user.name}</div>

                    <div className="postfollower">
                      <div className="profile-stats">
                        <span>
                          <b>{post.length}</b> post
                        </span>

                        <span>
                          <b>{followCount}</b> Following
                        </span>

                        <span>
                          <b>{followerCount}</b> Followers
                        </span>
                      </div>
                    </div>
                    {bioprofile && (
  <p style={{ whiteSpace: "pre-line" }} className="d-flex flex-column">{bioprofile.bio}</p>
)}
                        <div className="button-container">

                      <button className="EditButton" onClick={()=>{navigate(`/EditProfile/${prof.user.username}`)}}>Edit Profile</button>
                      <button className="archiveButton">View archive</button>
                        
                    
                    </div>
                  <div className="new-highlight">
  <PiPlusCircleDuotone className="plus-icon" />
  <div className="new-text">New</div>
</div>
<div className="profile-tabs">
  <div className="tab active">
    <PiDotsNineBold  onClick={()=>{setMenupost(true);
                        setSavedpost(false);
                      
                        }}/>
  </div>

  <div className="tab">
    <FaRegBookmark onClick={()=>{
      setSavedpost(true);
      setMenupost(false);

    }} />
  </div>

  <div className="tab">
    <i className="bi bi-person-square"></i>
  </div>
</div>
<div className="menutab">

{
 menupost && post.map((posts)=>{
    return(
      <div key={posts.id} >
      <img src={posts.postImage} className="post " onClick={()=>{navigate('/PrivatePost')}}/>
    </div>
    )
  })
}
</div>

{
 savedpost && savingPost
      .filter((savepost) => savepost && savepost.postImage)
      .map((savepost) =>{
    return(
       <div key={savepost.id} className="menutab">
      <img src={savepost.postImage} className="post " onClick={()=>{navigate('/SavedPost')}}/>
      </div>
    )
  })
}
{
  post.length === 0 && (
<>

<div className="camera">
  < IoCameraOutline />

</div>
 <div className="d-flex flex-column align-items-center">
  <h1 className="d-flex flex-column  align-items-center justify-content-center pe-5 me-4 sharephotos">Share Photos</h1>
  <p className="pe-4 me-4 parashare">When you share photos, the link appear on your profile.</p>
  <h6 className="text-primary pe-5 me-5 headshare">Share your first photo</h6>
  </div> 
</>
  )
}
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>

    </>
   
    
   
  );
}

export default Profile;
