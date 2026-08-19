import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../App.css";

function ViewStory() {
  const { id } = useParams();
  const [viewedStory, setViewStory] = useState([]);
  const [stories,setStories]=useState([])
  useEffect(() => {
    fetch('http://localhost:5000/stories')
      .then((res) => {
        if (res.ok) {
          
          return res.json();
        } else {
          throw new Error("Data not Found");
        }
      })
      .then((data) => {
        setStories(data);
         const currentStory=data.find((story)=>String(story.id)===String(id))
          setViewStory(currentStory ? [currentStory] : []) 
          
        })
      .catch((error) => console.log(error));
//currentStory = 1 so setviewStory(1) which means viewStory(1)
  }, [id]);

  const currentIndex=stories.findIndex((story)=>String(story.id) === String(id))

  console.log("stories:", stories);
console.log("is array:", Array.isArray(stories));

  const navigate=useNavigate()
const scrollLeftStory=()=>{
  if(currentIndex === 0){
    navigate('/');
    return;
  }
  navigate(`/ViewStory/${stories[currentIndex-1].id},{replace:true}`)
}
const scrollRightStory=()=>{
  if(currentIndex < stories.length -1){
    navigate(`/ViewStory/${stories[currentIndex+1].id}`,{replace:true})
  }
}
  return (
    <>
      <div className="d-flex bg-dark vh-100">
        {viewedStory.map((story) => {
         
          
          return (
            <div
              key={story.id}
              className="d-flex story"
            >
              {story.storyType === "image" && (
                <div className="story-image-container">
                  <img src={story.storyUrl} className="view-story-image" />

                  <div className="story-user">
                    <img src={story.profileImage} className="story-profile" />

                    <div className="story-details">
                      <span className="story-username">{story.username}</span>

                      <span className="story-time">{story.timestamp}</span>
                    </div>
                    <span className="story-menu">•••</span>
                  </div>
                </div>
              )}
             <div
              key={story.id}
              className="d-flex  justify-content-center align-items-center ms-5  video"
            >
              {story.storyType === "video" && (
                <div style={{width:"400px",backgroundColor:"transparent"}} className="video-image-container bg-light">
                <video
                  src={String(story.storyUrl)}
                  width="300px"
                  className="view-video-image"
                  autoPlay
                  playsInline
                  muted
                />
                <div className=" video-user">
                    <img src={story.profileImage} className="video-profile" />

                    
                      <div className="video-details">
                        <span className="video-username">{story.username}</span>
                      <span className="video-time">{story.timestamp}</span>
                        
                        </div>

                   
                    <span className="video-menu">•••</span>
                 </div>
                  </div>
                 
              )}
            </div>
            </div>
          );
        })}

        
          {
            currentIndex > 0 &&(
             

            <button
            className="story-arrow-left left-20"
            onClick={scrollLeftStory}
          >
            <i className="bi bi-chevron-left"></i>
          </button>
              
            )
          }
       
{
  currentIndex < stories.length -1 && (

          <button className="story-arrow right-20" onClick={scrollRightStory}>
            <i className="bi bi-chevron-right"></i>
          </button>
  )
}
        
       
      </div>
    </>
  );
}

export default ViewStory;
