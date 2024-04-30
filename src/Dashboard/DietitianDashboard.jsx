import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { get, ref } from 'firebase/database';
import { useAuth } from '../contexts/AuthContext.jsx'; // Adjust this path if necessary
import { getDatabase } from 'firebase/database';
import Header from '../HeaderComponents/Header';

const DietitianDashBoard = () => {
    const { user } = useAuth(); // Adjust according to your auth context implementation
    const [profileExists, setProfileExists] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            // Assuming `user` has a unique ID you can use to check the profile
            const profileRef = ref(database, 'BusinessProfile/' + user.uid);
            get(profileRef).then((snapshot) => {
                if (snapshot.exists()) {
                    setProfileExists(true);
                } else {
                    // Profile doesn't exist, redirect to create profile
                    navigate('/create-business-profile');
                }
            }).catch((error) => {
                console.error(error);
                // Handle errors here, such as a redirect to an error page or displaying a message
            });
        }
    }, [user, navigate]);

    return (
        <div>
            <Header />
            <h1>Dietitian Dashboard</h1>
            {profileExists ? (
                <div>Welcome to your Dashboard!</div>
            ) : (
                <div>Creating your business profile...</div>
                // You can also place a button here to manually redirect or create a profile form
            )}
        </div>
    );
};

export default DietitianDashBoard;
