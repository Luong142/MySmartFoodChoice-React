import React, { useState, useEffect } from 'react';
import { auth, db } from '../Firebase/Firebase'; // Assuming db is your Firestore instance
import { useNavigate } from 'react-router-dom';

function UserDashboard() {
  const [user, setUser] = useState(auth.currentUser); // Initialize user state with current user
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for changes in authentication state
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user); // Update user state when authentication state changes
    });

    return () => {
      // Unsubscribe from the authentication state listener when component unmounts
      unsubscribe();
    };
  }, []);

  const handleDeleteAccount = async () => {
    if (!user) {
      // If user is not signed in, do not proceed with deletion
      alert('You need to be signed in to delete your account.');
      return;
    }

    const confirmDelete = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    );

    if (confirmDelete) {
      try {
        // Delete user account from Firebase Authentication
        await auth.currentUser.delete();

        // Redirect or notify user after successful deletion
        alert('Your account has been successfully deleted.');
        navigate('/SignIn');
        // Redirect user to a landing page or sign-in page
      } catch (error) {
        console.error('Error deleting account:', error);
        alert(
          'An error occurred while deleting your account. Please try again later.'
        );
      }
    }
  };

  return (
    <div>
      <h2>Delete Account</h2>
      <p>
        Are you sure you want to delete your account? This action cannot be
        undone.
      </p>
      <button onClick={handleDeleteAccount}>Delete Account</button>
    </div>
  );
}

export default UserDashboard;
