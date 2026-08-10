import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import { FaInstagram } from "react-icons/fa";
import { GrHomeRounded } from "react-icons/gr";
import { MdOutlineSmartDisplay } from "react-icons/md";
import { RiSendInsLine } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { BsPlusLg } from "react-icons/bs";
import { IoIosMenu } from "react-icons/io";
import { SiThreads } from "react-icons/si";
import profile from "../assets/profile-dp.jpeg";
import { GoHomeFill } from "react-icons/go";
import { MdSmartDisplay } from "react-icons/md";
import { RiSendInsFill } from "react-icons/ri";
import { FaHeart } from "react-icons/fa";
import '../App.css'

function SideBar() {
  const [Hover, setHover] = useState(false);
  const [click, setClick] = useState("");

  return (
    <>
      <Navbar
        className=" sidebar w-20 position-fixed"
        onMouseEnter={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
      >
        <Container
          fluid
          className="container  d-flex flex-column align-items-start  p-4 vh-100"
        >
          {/* {Top page} */}
          <Navbar.Brand className="navbar-brand">
            {" "}
            <FaInstagram size={28} />
          </Navbar.Brand>

          {/* middle*/}

          <Nav className=" nav flex-column">
            <Nav.Link className="text-dark" onClick={() => setClick("Home")}>
              {click === "Home" ? (
                <GoHomeFill size={25} className="me-4 mb-2" />
              ) : (
                <GrHomeRounded size={25} className="me-4 mb-2" />
              )}
              {window.innerWidth > 1000 && Hover && "Home"}
              <span className="popup-text">Home</span>
            </Nav.Link>
            <Nav.Link className="text-dark">
              <FiSearch size={30} className="me-3 mb-2" />{" "}
              {window.innerWidth > 1000 && Hover && "Search"}
              <span className="popup-text">Search</span>
            </Nav.Link>
            <Nav.Link className="text-dark" onClick={() => setClick(true)}>
              <BsPlusLg size={30} className="me-3 mb-2" />{" "}
              {window.innerWidth > 1000 && Hover && "Create"}
              <span className="popup-text">Reels</span>
            </Nav.Link>
            <Nav.Link className="text-dark" onClick={() => setClick("Reels")}>
              {click === "Reels" ? (
                <MdSmartDisplay size={30} className="me-3 mb-2" />
              ) : (
                <MdOutlineSmartDisplay size={30} className="me-3 mb-2" />
              )}{" "}
              {window.innerWidth > 1000 && Hover && "Reels"}
              <span className="popup-text">Create</span>
            </Nav.Link>
            <Nav.Link
              className="text-dark"
              onClick={() => setClick("Messages")}
            >
              {click === "Messages" ? (
                <RiSendInsFill size={30} className="me-3 mb-2" />
              ) : (
                <RiSendInsLine size={30} className="me-3 mb-2" />
              )}{" "}
              {window.innerWidth > 1000 && Hover && "Messages"}
              <span className="popup-text">Messages</span>
            </Nav.Link>
            <Nav.Link className="text-dark">
              <img src={profile} className="me-3 mb-2 w-15 rounded-circle" />
              {window.innerWidth > 1000 && Hover && "Profile"}
              <span className="popup-text">Profile</span>
            </Nav.Link>
            <Nav.Link
              className="text-dark heart"
              onClick={() => setClick("Notifications")}
            >
              {click === "Notifications" ? (
                <FaHeart size={30} className="me-3 mb-2" />
              ) : (
                <FaRegHeart size={30} className="me-3 mb-2" />
              )}{" "}
              {window.innerWidth > 1000 && Hover && "Notifications"}
            </Nav.Link>
          </Nav>

          {/* {Bottom page} */}

          <Nav className="bottom-nav  flex-column align-items-start">
            <NavDropdown
              title={
                <>
                  <IoIosMenu className="me-2  mb-2 bottom-link" size={38} />
                  {Hover && "More"}
                </>
              }
              className="sidebar-dropdown fs-6 d-flex  text-dark align-items-center"
            ></NavDropdown>

            <Nav.Link className="text-dark me-2">
              <SiThreads size={30} className="me-2 mb-2 bottom-link" />{" "}
              {Hover && "Threads"}
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default SideBar;
