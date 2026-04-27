import React, { createContext, useState, useCallback } from 'react';

/**
 * AuthContext - Global Authentication Context
 * Manages user login/logout state across the entire application
 */
export const AuthContext = createContext();

/**
 * AuthProvider Component
 * Provides authentication state and methods to all child components
 * Uses Context API for global state management without Redux
 */
export const AuthProvider = ({ children }) => {
  // State to track if user is authenticated and current user data
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Login function - Authenticates user with email and password
   * @param {string} email - User email address
   * @param {string} password - User password
   * Mock authentication - In production, connect to your SQLite API/backend
   */
  const login = useCallback((email, password) => {
    setLoading(true);
    setError(null);

    // Simulate API call delay
    setTimeout(() => {
      // Mock validation - Replace with actual API call to backend
      if (email && password && password.length >= 4) {
        const userData = {
          id: Math.random().toString(36).substr(2, 9),
          email: email,
          name: email.split('@')[0],
          role: 'Employee',
          loginTime: new Date().toLocaleString(),
        };
        setCurrentUser(userData);
        setIsAuthenticated(true);
        setLoading(false);
      } else {
        setError('Invalid email or password (min 4 characters)');
        setLoading(false);
      }
    }, 500);
  }, []);

  /**
   * Logout function - Clears authentication state
   * Removes current user information and sets authenticated to false
   */
  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setError(null);
  }, []);

  /**
   * Value object containing all authentication state and methods
   * Memoization ensures child components only re-render when necessary
   */
  const value = {
    isAuthenticated,
    currentUser,
    loading,
    error,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom Hook - useAuth
 * Simplifies accessing auth context in any component
 * Usage: const { isAuthenticated, login, logout } = useAuth();
 */
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
