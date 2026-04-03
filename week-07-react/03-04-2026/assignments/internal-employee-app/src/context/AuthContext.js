import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize user from localStorage to persist login sessions
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('authUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  // Sync state to localStorage whenever the user logs in or out
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('authUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('authUser');
    }
  }, [currentUser]);

  // Simulate authentication with an API delay for loading UX
  const login = async (email, password) => {
    setIsLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        setIsLoading(false);
        if (email === 'admin@company.com' && password === 'admin123') {
          const user = { id: 1, name: 'System Admin', email, role: 'admin' };
          setCurrentUser(user);
          resolve(user);
        } else if (email === 'anurag@company.com' && password === 'emp123') {
          const user = { id: 2, name: 'Anurag Bharadwaj', email, role: 'employee' };
          setCurrentUser(user);
          resolve(user);
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 800);
    });
  };

  const logout = () => setCurrentUser(null);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);