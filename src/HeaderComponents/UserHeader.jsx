import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { RiUser3Line } from "react-icons/ri";
import { getDatabase, ref, query, onValue } from "firebase/database";
import { useNavigate } from "react-router-dom";

function UserHeader() {
  const [profilePicture, setProfilePicture] = useState("");
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("uid");
  const navigate = useNavigate();

  useEffect(() => {
    const db = getDatabase();
    const userRef = query(ref(db, `User Profile/${userId}`));

    const unsubscribeUser = onValue(
      userRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          console.log(userData);
          setProfilePicture(userData.profileImageUrl);
          setLoading(false);
        } else {
          console.log("User not found");
          setLoading(false);
        }
      },
      (error) => {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    );

    return () => unsubscribeUser();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
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
            <Link to="/">Log a meal</Link>
          </li>
          <li>
            <Link to="/RoyaltyPoints">Royalty points</Link>
          </li>
          <li>
            <Link to="/ReviewForm">Leave a review</Link>
          </li>
          <li>
            <Link to="/ContactUs">Contact Us</Link>
          </li>
          <li>
            <Link to="/AboutUs">About Us</Link>
          </li>
          <li onClick={handleLogout} style={{ cursor: "pointer" }}>
            Logout
          </li>
          <li className="avatar-dropdown">
            <Link to="/CreateUserProfile" className="avatar-icon">
              {loading ? (
                <p>Loading image...</p>
              ) : profilePicture ? (
                <img
                  src={profilePicture}
                  height={50}
                  width={50}
                  style={{ borderRadius: "50%" }}
                />
              ) : (
                <RiUser3Line />
              )}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
export default UserHeader;