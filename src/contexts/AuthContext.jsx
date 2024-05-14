import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setIsLoggedIn(true);
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const logIn = (userData) => {
        setIsLoggedIn(true);
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData)); // Save the user data to localStorage
    };

    const logOut = () => {
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem('user'); // Clear the user data from localStorage
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, logIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};
