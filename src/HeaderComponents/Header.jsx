import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import HomeLogo from '../assets/home2.svg';
import { useAuth } from '../contexts/AuthContext.jsx';

function Header() {
    const { isLoggedIn } = useAuth();  // Access the login state

    return (
        <nav className='nav'>
            <div className="header-content">
                <ul className='nav-links'>
                    <li><Link to="/">
                        <img src={HomeLogo}
                            width="50" 
                            height="20">
                            
                        </img>
                        Smart Food Choice
                        </Link>
                    </li>
                    <li><Link to="/SignIn">Log In</Link></li>
                    <li><Link to="/SignUp">Sign Up</Link></li>
                    <li><Link to="/ReviewForm">Leave a Review</Link></li>
                    <li><Link to="/AboutUs">About Us</Link></li>
                    <li><Link to="/ContactUs">Contact Us</Link></li>
                    
                </ul>
            </div>
        </nav>
    );
}

export default Header;
