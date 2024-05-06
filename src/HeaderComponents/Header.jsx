import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import HomeLogo from "../assets/home2.svg";
import { useAuth } from "../contexts/AuthContext.jsx";

function Header() {
  const [userEmail, setUseEmail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setUseEmail(localStorage.getItem("email"));
  }, [localStorage.getItem("email")]);

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("uid");
    localStorage.removeItem("userType");
    navigate("/");
  };

  return (
    <nav className="nav">
      <div className="header-content">
        <h1 className="title" style={{ fontSize: "1.5em" }}>
          Smart Food Choice
        </h1>
        <ul className="nav-links">
          <li>
            <Link to="/">
              <img src={HomeLogo} alt="Home" width="50" height="20" />
              Home
            </Link>
          </li>
          {userEmail === null && (
            <>
              <li>
                <Link to="/SignIn">Log In</Link>
              </li>
              <li>
                <Link to="/SignUp">Sign Up</Link>
              </li>
            </>
          )}
          <li>
            <Link to="/ReviewForm">Leave a Review</Link>
          </li>
          <li>
            <Link to="/AboutUs">About Us</Link>
          </li>
          <li>
            <Link to="/ContactUs">Contact Us</Link>
          </li>
        </ul>
        <ul>{userEmail !== null && <li onClick={handleLogout}>Logout</li>}</ul>
      </div>
    </nav>
  );
}

export default Header;
