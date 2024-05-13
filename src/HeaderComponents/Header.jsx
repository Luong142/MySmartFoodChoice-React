import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Make sure this path is correct
import HomeLogo from '../assets/home2.svg'; // Confirm that the path and file name are correct
import { useAuth } from '../contexts/AuthContext.jsx';

function Header() {
    const { isLoggedIn, user, logOut } = useAuth(); // Using a context to handle authentication

    return (
        <nav className='nav'>
            <div className="header-content">
                <Link to="/">
                    <img src={HomeLogo} alt="Home" style={{ width: '50px', height: '50px' }} />
                </Link>
                <h1 className='title'> Smart Food Choice</h1>
                <ul className='nav-links'>
                    <li></li>
                    <li><Link to="/ReviewForm">Leave a Review</Link></li>
                    <li><Link to="/AboutUs">About Us</Link></li>
                    <li><Link to="/ContactUs">Contact Us</Link></li>
                </ul>
            </div>
            <div className="login-section">
                {!isLoggedIn ? (
                    <>
                        <Link to="/SignIn">Log In</Link>
                        <Link to="/SignUp" style={{ marginLeft: '10px' }}>Sign Up</Link>
                    </>
                ) : (
                    <>
                        <span>Welcome, {user.name}!</span>
                        <Link to="/" onClick={logOut} style={{ marginLeft: '10px' }}>Log Out</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Header;
