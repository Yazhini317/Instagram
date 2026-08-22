import React, { useEffect, useState } from "react";
import { Grid, TextField } from "@mui/material";
import { IoIosClose } from "react-icons/io";
import "./Search.css";

function Search() {

    const [search, setSearch] = useState([]);
    const [explorePosts, setExplorePosts] = useState([]);

    const [click, setClick] = useState(null);
    const [expand, setExpand] = useState(false);


    useEffect(() => {

        // Fetch Explore data
        fetch("https://instagram-project-oybk.onrender.com/Explore")
            .then((res) => {

                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("Explore data not found");
                }

            })
            .then((data) => {
                setSearch(data);
            })
            .catch((error) => {
                console.log(error.message);
            });


        // Fetch Posts data
        fetch("https://instagram-project-oybk.onrender.com/posts")
            .then((res) => {

                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("Posts data not found");
                }

            })
            .then((data) => {
                setExplorePosts(data);
            })
            .catch((error) => {
                console.log(error.message);
            });

    }, []);


    return (

        <div className="search-page">


            {/* SEARCH */}

            <Grid className="searchbox2">

                <TextField
                    placeholder="Search"
                    type="search"
                    fullWidth
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "30px",
                            height: "40px",
                            backgroundColor: "rgba(206, 197, 197, 0.06)",
                        },
                    }}
                />

            </Grid>


            {/* EXPLORE GRID */}

            <div className="containerSearch">

                {search.map((searchPosts) => {

                    return (

                        <div
                            key={searchPosts.id}
                            className="explore-item"
                            onClick={() => {

                                setClick(searchPosts.id);
                                setExpand(true);

                            }}
                        >

                            {searchPosts.mediaType === "video" ? (

                                <video
                                    src={searchPosts.mediaUrl}
                                    muted
                                    loop
                                    autoPlay
                                    playsInline
                                />

                            ) : (

                                <img
                                    src={searchPosts.mediaUrl}
                                    alt=""
                                />

                            )}

                        </div>

                    );

                })}

            </div>


            {/* EXPANDED POST */}

            {click !== null &&
                expand &&

                search.map((searchPosts) => {

                    if (click !== searchPosts.id) {
                        return null;
                    }


                    // Find the same post from /posts

                    const selectedPost = explorePosts.find(
                        (item) => item.id === searchPosts.id
                    );


                    return (

                        <div
                            className="commentExpand"
                            key={searchPosts.id}
                        >

                            <div className="commentModal">


                                {/* LEFT - IMAGE / VIDEO */}

                                <div className="commentPost">

                                    {searchPosts.mediaType === "video" ? (

                                        <video
                                            src={searchPosts.mediaUrl}
                                            controls
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                        />

                                    ) : (

                                        <img
                                            src={searchPosts.mediaUrl}
                                            alt=""
                                        />

                                    )}

                                </div>


                                {/* RIGHT - COMMENTS */}

                                <div className="comment">


                                    {/* HEADER */}

                                    <div className="commentHeader">

                                        <img
                                            src={selectedPost?.user?.profileImage}
                                            className="rounded-circle"
                                            alt=""
                                        />

                                        <b className="commentHeadername">

                                            {selectedPost?.user?.username}

                                        </b>


                                        <IoIosClose
                                            size={25}
                                            className="ms-auto"
                                            style={{
                                                cursor: "pointer"
                                            }}
                                            onClick={() => {

                                                setExpand(false);
                                                setClick(null);

                                            }}
                                        />

                                    </div>


                                    {/* COMMENT BODY */}

                                    <div className="commentBody">


                                        {/* USER + CAPTION */}

                                        <div className="d-flex align-items-start">

                                            <img
                                                src={selectedPost?.user?.profileImage}
                                                className="rounded-circle"
                                                alt=""
                                            />

                                            <span>

                                                <b className="ps-2">

                                                    {selectedPost?.user?.username}

                                                </b>{" "}

                                                {selectedPost?.caption}


                                                <p className="explore-time">

                                                    {selectedPost?.timestamp}

                                                </p>

                                            </span>

                                        </div>


                                        {/* COMMENTS */}

                                        {selectedPost?.comments?.map((comment) => (

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

                                                    <b className="ps-2">

                                                        {comment.username}

                                                    </b>{" "}

                                                    {comment.comment}

                                                </span>

                                            </div>

                                        ))}

                                    </div>


                                    {/* BOTTOM */}

                                    <div className="commentBottom">

                                        <input
                                            type="text"
                                            placeholder="Add a comment..."
                                        />

                                        <button>
                                            Post
                                        </button>

                                    </div>


                                </div>

                            </div>

                        </div>

                    );

                })}

        </div>

    );
}

export default Search;