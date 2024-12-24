import React, { createContext, useState, useEffect, useContext } from 'react';
import { findUser } from './userDatabase';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Add effect to check for user updates
  useEffect(() => {
    if (currentUser?.email) {
      const latestUserData = findUser(currentUser.email);
      if (latestUserData?.subscriptionType !== currentUser.subscriptionType) {
        const updatedUser = { ...currentUser, subscriptionType: latestUserData.subscriptionType };
        setCurrentUser(updatedUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      }
    }
  }, [currentUser?.email]);

  const login = (user) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  const updateSubscription = () => {
    if (currentUser?.email) {
      const latestUserData = findUser(currentUser.email);
      const updatedUser = { ...currentUser, subscriptionType: latestUserData.subscriptionType };
      setCurrentUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, updateSubscription, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);