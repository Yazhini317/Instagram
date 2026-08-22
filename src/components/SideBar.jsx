import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import { FaInstagram } from "react-icons/fa";
import { GrHomeRounded } from "react-icons/gr";
import { FaRegBookmark } from "react-icons/fa";
import { MdOutlineSmartDisplay } from "react-icons/md";
import { RiSendInsLine } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { BsPlusLg } from "react-icons/bs";
import { IoIosMenu } from "react-icons/io";
import { SiThreads } from "react-icons/si";
import { MdOutlineWbSunny } from "react-icons/md";
import profile from "../assets/profile-dp.jpeg";
import { GoHomeFill } from "react-icons/go";
import { MdSmartDisplay } from "react-icons/md";
import { RiSendInsFill } from "react-icons/ri";
import { FaHeart } from "react-icons/fa";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Paper, Typography } from "@mui/material";

function SideBar({ user }) {
  const [menuSwitch,setMenu]=useState(null)
  const handleMenuSwitch=(name)=>{
      setMenu(menuSwitch === name ? null : name)
  }
  const [Hover, setHover] = useState(false);
  const [click, setClick] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const isProfile = location.pathname.startsWith(`/${user}`);
  return (
    <>
      <Navbar
        className=" sidebar position-fixed"
        onMouseEnter={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
      >
        <Container
          fluid
          className="container d-flex flex-column align-items-start vh-100"
        >
          {/* {Top page} */}
          {/* {
             window.innerWidth > 1000 && !isProfile &&  (

          <Navbar.Brand className="navbar-brand ms-2 mb-2 profile-desktop-brand">
            {" "}
            <FaInstagram size={25} />
          </Navbar.Brand>

            )
          } */}
          <Navbar.Brand
            className={`navbar-brand ms-2 mb-2 ${
              isProfile ? "profile-desktop-brand" : ""
            }`}
          >
            <FaInstagram size={25} />
          </Navbar.Brand>

          {/* middle*/}

          <Nav className="nav flex-column justify-content-evenly 100vh">
            <Nav.Link
              className="text-dark"
              onClick={() => {
                setClick("Home");
                navigate("/");
              }}
            >
              {click === "Home" ? (
                <GoHomeFill size={25} className="me-4 mb-2" />
              ) : (
                <GrHomeRounded size={25} className="me-4 mb-2" />
              )}
              {window.innerWidth > 1000 && Hover && "Home"}
              <span className="popup-text">Home</span>
            </Nav.Link>
            <Nav.Link className="text-dark">
              <FiSearch size={25} className="me-3 mb-2"  onClick={()=>{navigate('/Search')}}/>{" "}
              {window.innerWidth > 1000 && Hover && (
                <span onClick={()=>{navigate('/Search')}}>Search</span>
              )}
              <span className="popup-text" >Search</span>
            </Nav.Link>
            <Nav.Link className="text-dark" onClick={() =>{ 
              
              navigate('/NewPost')
              }}>
              <BsPlusLg size={25} className="me-3 mb-2" />{" "}
              {window.innerWidth > 1000 && Hover && "Create"}
              <span className="popup-text">Create</span>
            </Nav.Link>
            {/* <NavDropdown
              className="sidebar-dropdown text-dark"
              title={
                <>
                  <BsPlusLg size={25} className="me-3 mb-2" />
                  {window.innerWidth > 1000 && Hover && "Create"}
                  <span className="popup-text">Create</span>
                </>
              }
            >
              <NavDropdown.Item onClick={()=>{navigate('/NewPost')}}>Public Post</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>{navigate('/PrivatePost')}}>Private Post</NavDropdown.Item>
            </NavDropdown> */}

            <Nav.Link className="text-dark" onClick={() => setClick("Reels")}>
              {click === "Reels" ? (
                <MdSmartDisplay size={25} className="me-3 mb-2"  />
              ) : (
                <MdOutlineSmartDisplay size={25} className="me-3 mb-2" onClick={()=>{navigate('/Reels')}} />
              )}{" "}
              {window.innerWidth > 1000 && Hover && (
                <span onClick={()=>{navigate('/Reels')}}>Reels</span>
              )}
              <span className="popup-text">Reels</span>
            </Nav.Link>
            <Nav.Link
              className="text-dark"
              onClick={() => setClick("Messages")}
            >
              {click === "Messages" ? (
                <RiSendInsFill size={25} className="me-3 mb-2" onClick={()=>{navigate('/Message')}} />
              ) : (
                <RiSendInsLine size={25} className="me-3 mb-2" onClick={()=>{navigate('/Message')}} />
              )}{" "}
              {window.innerWidth > 1000 && Hover && (
                <span onClick={()=>{navigate('/Message')}}>Messages</span>
              )}
              <span className="popup-text">Messages</span>
            </Nav.Link>
            {/* {
             window.innerWidth > 1000 && !isProfile && (
            <Nav.Link
              className="text-dark heart profile-desktop-heart"
              onClick={() => setClick("Notifications")}
            >
              {click === "Notifications" ? (
                <FaHeart size={25} className="me-3 mb-2" />
              ) : (
                <FaRegHeart size={25} className="me-3 mb-2" />
              )}{" "}
              {window.innerWidth > 1000 && Hover && "Notifications"}
            </Nav.Link>

              )
            } */}

            <Nav.Link
              className={`text-dark heart ${
                isProfile ? "profile-desktop-heart" : ""
              }`}
              onClick={() => setClick("Notifications")}
            >
              {click === "Notifications" ? (
                <FaHeart size={25} className="me-3 mb-2" onClick={()=>{navigate('/LikedPost')}} />
              ) : (
                <FaRegHeart size={25} className="me-3 mb-2" />
              )}

              {window.innerWidth > 1000 && Hover && 
              <span onClick={()=>{navigate('/LikedPost')}}>Notifications</span>
              }
            </Nav.Link>
            <Nav.Link as={Link} to={`/${user}`} className="text-dark">
              <img src={profile} className="me-3 mb-2 w-15 rounded-circle" />
              {window.innerWidth > 1000 && Hover && "Profile"}
              <span className="popup-text" >Profile</span>
            </Nav.Link>
          </Nav>

          {/* {Bottom page} */}

          <Nav className="bottom-nav  flex-column align-items-start">
            <NavDropdown
             
             title={
                <>
                  <IoIosMenu className="me-2  mb-2 bottom-link" size={25} />
                  {Hover && "More"}
                </>
              }
              className="sidebar-dropdown  fs-6 d-flex  text-dark align-items-center "
              
             
           >
              
              <NavDropdown.Item onClick={()=>{navigate(`/EditProfile/ya_zh_u`)}} ><IoSettingsOutline/>{" "}Edit Settings</NavDropdown.Item>
              <NavDropdown.Item  onClick={()=>{navigate('/SavedPost')}} ><FaRegBookmark/>{" "}Saved</NavDropdown.Item>
                
             
            </NavDropdown>

            <Nav.Link className="text-dark me-2">
              <SiThreads size={25} className="me-2 mb-2 bottom-link" />{" "}
              {Hover && "Threads"}
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      {window.innerWidth > 1000 ? (
        <Paper
          elevation={15}
          style={{ borderRadius: "30px", width: "200px" }}
          className="paper"
        >
          <Typography
            variant="h6"
            className="d-flex align-items-center gap-3 fs-6 fw-bold"
          >
            <RiSendInsLine size={25} onClick={()=>{navigate('/Message')}}/>
            Messages
          </Typography>
        </Paper>
      ) : (
        <Paper
          elevation={15}
          style={{ borderRadius: "50%", width: "50px", height: "50px" }}
          className="paper"
        >
          <Typography
            variant="h6"
            className="d-flex align-items-center justify-content-center mt-1 fs-7 fw-bold"
          >
            <RiSendInsLine size={25} onClick={()=>{navigate('/Message')}} />
          </Typography>
        </Paper>
      )}
    </>
  );
}

export default SideBar;
