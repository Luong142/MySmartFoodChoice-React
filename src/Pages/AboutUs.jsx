import React from 'react';
import './AboutUs.css';
import Header from '../HeaderComponents/Header';
import image from '../assets/AboutUs.jpg';
function AboutUs() {
    return (
        <div className="about-us-page">
            <Header />
            <div className="about-us-hero">
                {/* Adjust the path as shown below */}
                <img src={image} className="hero-image"/>
                
            </div>
            <div className="about-us-content">
                <section className="about-us-intro">
                    {/* Update the path for your intro image as well */}
                    <img src="../assets/intro-image.jpg" alt="Introduction Image" className="intro-image"/>
                    <div className="intro-text">
                        <h2>Welcome to Our Site!</h2>
                        <p>
                            MyFoodChoice is the application to help you realize your health goals.
                        </p>
                    </div>
                </section>
                <section className="about-us-team">
                    <h2>Meet the Team</h2>
                    <div className="team-members">
                        {/* Repeat for each team member */}
                        <div className="team-member">
                            {/* Update the path for each team member image */}
                            <img src="../assets/team-member-image.jpg" alt="Team Member Name" className="member-image"/>
                            <h3>Team Member Name</h3>
                            <p>Short description about the team member.</p>
                        </div>
                    </div>

                </section>
            </div>
        </div>
    );
}

export default AboutUs;
