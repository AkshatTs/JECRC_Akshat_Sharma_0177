import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import '../styles/components.css';

/**
 * Navbar Component
 * Displays navigation bar with user info and theme toggle
 * Shows logout button and current user details
 */
const Navbar = ({ active, onNavigate }) => {
  const { currentUser, logout } = useAuth();
  const { theme, toggleTheme, getThemeColors } = useTheme();
  
  // Get theme-specific colors
  const colors = getThemeColors();

  /**
   * Handle logout click - calls logout function and resets navigation
   */
  const handleLogout = () => {
    logout();
    onNavigate('login');
  };

  /**
   * Navigate to different section - emits navigation event to parent
   */
  const handleNavigate = (section) => {
    onNavigate(section);
  };

  return (
    <nav 
      className="navbar"
      style={{
        backgroundColor: colors.card,
        borderBottom: `2px solid ${colors.border}`,
      }}
    >
      <div className="navbar-container">
        {/* Logo/Brand Section */}
        <div className="navbar-brand">
          <h2>Employee Portal</h2>
        </div>

        {/* Navigation Links */}
        <div className="navbar-menu">
          <button
            className={`nav-link ${active === 'dashboard' ? 'active' : ''}`}
            onClick={() => handleNavigate('dashboard')}
            style={{
              color: active === 'dashboard' ? colors.primary : colors.text,
            }}
          >
            Dashboard
          </button>
          <button
            className={`nav-link ${active === 'employees' ? 'active' : ''}`}
            onClick={() => handleNavigate('employees')}
            style={{
              color: active === 'employees' ? colors.primary : colors.text,
            }}
          >
            Employees
          </button>
          <button
            className={`nav-link ${active === 'analytics' ? 'active' : ''}`}
            onClick={() => handleNavigate('analytics')}
            style={{
              color: active === 'analytics' ? colors.primary : colors.text,
            }}
          >
            Analytics
          </button>
          <button
            className={`nav-link ${active === 'settings' ? 'active' : ''}`}
            onClick={() => handleNavigate('settings')}
            style={{
              color: active === 'settings' ? colors.primary : colors.text,
            }}
          >
            Settings
          </button>
        </div>

        {/* Right Section - User Info and Controls */}
        <div className="navbar-right">
          {/* User Info Display */}
          <div className="user-info">
            <span className="user-name">
              Welcome, <strong>{currentUser?.name}</strong>
            </span>
            <span className="user-email">{currentUser?.email}</span>
          </div>

          {/* Theme Toggle Button */}
          <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            style={{
              backgroundColor: colors.primary,
              color: 'white',
            }}
          >
            {theme === 'light' ? 'Dark' : 'Light'}
          </button>

          {/* Logout Button */}
          <button
            className="logout-btn"
            onClick={handleLogout}
            style={{
              backgroundColor: '#dc3545',
              color: 'white',
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
