import React, { createContext, useContext, useState } from 'react';

// Create a context
const AuthContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);  // Initialize with `false`

    // Pack the value in a `value` object
    const value = {
        isLoggedIn,
        setIsLoggedIn
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
    return useContext(AuthContext);
};
