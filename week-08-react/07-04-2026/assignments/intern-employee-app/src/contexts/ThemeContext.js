import React, { createContext, useState, useCallback } from 'react';

/**
 * ThemeContext - Global Theme Context
 * Manages Light/Dark theme preferences across the entire application
 */
export const ThemeContext = createContext();

/**
 * ThemeProvider Component
 * Provides theme state and toggle function to all child components
 * Persists theme preference in localStorage for persistence across sessions
 */
export const ThemeProvider = ({ children }) => {
  // Initialize theme from localStorage or default to 'light'
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  /**
   * Toggle theme function - Switches between 'light' and 'dark' modes
   * Saves preference to localStorage for persistence
   */
  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      // Persist theme preference in localStorage
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  }, []);

  /**
   * Get theme colors object based on current theme
   * Separates theme styling logic from component logic
   */
  const getThemeColors = useCallback(() => {
    return theme === 'light'
      ? {
          background: '#ffffff',
          text: '#000000',
          primary: '#007bff',
          secondary: '#6c757d',
          border: '#dee2e6',
          card: '#f8f9fa',
          hover: '#e9ecef',
        }
      : {
          background: '#1a1a1a',
          text: '#ffffff',
          primary: '#0056b3',
          secondary: '#495057',
          border: '#495057',
          card: '#2d2d2d',
          hover: '#404040',
        };
  }, [theme]);

  /**
   * Value object containing theme state and methods
   */
  const value = {
    theme,
    toggleTheme,
    getThemeColors,
    isDark: theme === 'dark',
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Custom Hook - useTheme
 * Simplifies accessing theme context in any component
 * Usage: const { theme, toggleTheme } = useTheme();
 */
export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
