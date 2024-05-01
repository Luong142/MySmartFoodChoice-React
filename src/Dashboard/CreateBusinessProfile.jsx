import React, { useState } from 'react';
import { getDatabase, ref, set } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import './CreateBusinessProfile.css';  // Ensure this CSS file is created

function CreateBusinessProfile() {
    const [contactNumber, setContactNumber] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [role, setRole] = useState('Dietitian');  // Assuming the role is static or pre-defined
    const navigate = useNavigate();

    // Assuming you store the user ID in localStorage after login
    const userId = localStorage.getItem('uid');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const db = getDatabase();
        const profileRef = ref(db, `Business Profile/${userId}`);

        // Saving the business profile to Firebase
        try {
            await set(profileRef, {
                contactNumber,
                firstName,
                lastName,
                role
            });
            alert('Business Profile Created Successfully!');
            navigate('/DietitianDashBoard');  // Redirecting to the dashboard
        } catch (error) {
            console.error('Failed to create business profile:', error);
            alert('Failed to create business profile');
        }
    };

    return (
        <div className="profile-form-container">
            <h1>Create Your Business Profile</h1>
            <form onSubmit={handleSubmit} className="profile-form">
                <label>
                    First Name:
                    <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} required />
                </label>
                <label>
                    Last Name:
                    <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} required />
                </label>
                <label>
                    Contact Number:
                    <input type="text" value={contactNumber} onChange={e => setContactNumber(e.target.value)} required />
                </label>
                <button type="submit">Create Profile</button>
            </form>
        </div>
    );
}

export default CreateBusinessProfile;
