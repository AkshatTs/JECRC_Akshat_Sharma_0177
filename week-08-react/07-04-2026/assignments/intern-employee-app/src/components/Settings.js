import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import '../styles/components.css';

/**
 * Settings Component
 * Displays application settings and preferences
 * Allows theme management and profile settings
 */
const Settings = () => {
  const { theme, toggleTheme, getThemeColors } = useTheme();
  const { currentUser } = useAuth();
  const colors = getThemeColors();

  // Local state for notification preferences
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    dashboardAlerts: true,
    reportNotifications: false,
  });

  // Local state for privacy settings
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'everyone',
    showEmail: true,
    showSalary: false,
  });

  /**
   * Handle notification preference toggle
   * @param {string} key - Setting key to toggle
   */
  const handleNotificationChange = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  /**
   * Handle privacy setting changes
   * @param {string} key - Setting key to change
   * @param {string|boolean} value - New value for the setting
   */
  const handlePrivacyChange = (key, value) => {
    setPrivacy((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  /**
   * Save settings to localStorage
   * In production, this would be saved to backend/database
   */
  const handleSaveSettings = () => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
    localStorage.setItem('privacy', JSON.stringify(privacy));
    alert('Settings saved successfully!');
  };

  return (
    <div className="settings-container">
      <h1>Settings & Preferences</h1>
      <p className="section-subtitle">Manage your application preferences and account settings</p>

      {/* User Profile Section */}
      <div className="settings-section" style={{ backgroundColor: colors.card }}>
        <h2>👤 User Profile</h2>
        <div className="profile-info">
          <div className="info-row">
            <label>Name:</label>
            <span>{currentUser?.name}</span>
          </div>
          <div className="info-row">
            <label>Email:</label>
            <span>{currentUser?.email}</span>
          </div>
          <div className="info-row">
            <label>Role:</label>
            <span>{currentUser?.role}</span>
          </div>
          <div className="info-row">
            <label>Login Time:</label>
            <span>{currentUser?.loginTime}</span>
          </div>
        </div>
      </div>

      {/* Theme Settings Section */}
      <div className="settings-section" style={{ backgroundColor: colors.card }}>
        <h2>🎨 Theme Settings</h2>
        <div className="setting-item">
          <div className="setting-content">
            <h3>Application Theme</h3>
            <p className="setting-description">
              Current mode: <strong>{theme === 'light' ? 'Light Mode' : 'Dark Mode'}</strong>
            </p>
          </div>
          <button
            className="theme-toggle-large"
            onClick={toggleTheme}
            style={{ backgroundColor: colors.primary }}
          >
            {theme === 'light' ? '🌙 Switch to Dark Mode' : '☀️ Switch to Light Mode'}
          </button>
        </div>
      </div>

      {/* Notification Settings Section */}
      <div className="settings-section" style={{ backgroundColor: colors.card }}>
        <h2>🔔 Notification Settings</h2>
        
        {/* Email Notifications Toggle */}
        <div className="setting-item">
          <div className="setting-content">
            <h3>Email Notifications</h3>
            <p className="setting-description">
              Receive email updates about employee records and system events
            </p>
          </div>
          <div className="toggle-switch">
            <input
              type="checkbox"
              id="emailNotifications"
              checked={notifications.emailNotifications}
              onChange={() => handleNotificationChange('emailNotifications')}
            />
            <label htmlFor="emailNotifications"></label>
          </div>
        </div>

        {/* Dashboard Alerts Toggle */}
        <div className="setting-item">
          <div className="setting-content">
            <h3>Dashboard Alerts</h3>
            <p className="setting-description">
              Show alerts and notifications in the application dashboard
            </p>
          </div>
          <div className="toggle-switch">
            <input
              type="checkbox"
              id="dashboardAlerts"
              checked={notifications.dashboardAlerts}
              onChange={() => handleNotificationChange('dashboardAlerts')}
            />
            <label htmlFor="dashboardAlerts"></label>
          </div>
        </div>

        {/* Report Notifications Toggle */}
        <div className="setting-item">
          <div className="setting-content">
            <h3>Report Notifications</h3>
            <p className="setting-description">
              Get notified when analytics reports are ready
            </p>
          </div>
          <div className="toggle-switch">
            <input
              type="checkbox"
              id="reportNotifications"
              checked={notifications.reportNotifications}
              onChange={() => handleNotificationChange('reportNotifications')}
            />
            <label htmlFor="reportNotifications"></label>
          </div>
        </div>
      </div>

      {/* Privacy Settings Section */}
      <div className="settings-section" style={{ backgroundColor: colors.card }}>
        <h2>🔒 Privacy Settings</h2>

        {/* Profile Visibility Setting */}
        <div className="setting-item">
          <div className="setting-content">
            <h3>Profile Visibility</h3>
            <p className="setting-description">
              Control who can see your profile information
            </p>
          </div>
          <select
            value={privacy.profileVisibility}
            onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
            className="settings-select"
          >
            <option value="everyone">Everyone</option>
            <option value="employees">Employees Only</option>
            <option value="admins">Admins Only</option>
          </select>
        </div>

        {/* Show Email Toggle */}
        <div className="setting-item">
          <div className="setting-content">
            <h3>Show Email Address</h3>
            <p className="setting-description">
              Display your email in your public profile
            </p>
          </div>
          <div className="toggle-switch">
            <input
              type="checkbox"
              id="showEmail"
              checked={privacy.showEmail}
              onChange={() => handlePrivacyChange('showEmail', !privacy.showEmail)}
            />
            <label htmlFor="showEmail"></label>
          </div>
        </div>

        {/* Show Salary Toggle */}
        <div className="setting-item">
          <div className="setting-content">
            <h3>Show Salary Information</h3>
            <p className="setting-description">
              Display your salary in the system (admin view only)
            </p>
          </div>
          <div className="toggle-switch">
            <input
              type="checkbox"
              id="showSalary"
              checked={privacy.showSalary}
              onChange={() => handlePrivacyChange('showSalary', !privacy.showSalary)}
            />
            <label htmlFor="showSalary"></label>
          </div>
        </div>
      </div>

      {/* Access & Data Section */}
      <div className="settings-section" style={{ backgroundColor: colors.card }}>
        <h2>📊 Access & Data</h2>
        <div className="info-list">
          <p>
            <strong>Database:</strong> SQLite (Backend integration ready)
          </p>
          <p>
            <strong>Current Storage:</strong> In-Memory (Session-based)
          </p>
          <p>
            <strong>Persistence:</strong> localStorage for theme and settings
          </p>
          <p>
            <strong>Last Sync:</strong> {new Date().toLocaleString()}
          </p>
        </div>
      </div>

      {/* Save All Settings Button */}
      <div className="settings-actions">
        <button
          className="btn-save-settings"
          onClick={handleSaveSettings}
          style={{ backgroundColor: colors.primary }}
        >
          💾 Save All Settings
        </button>
        <p className="settings-note">
          Note: Some settings are automatically saved. Your theme preference is persisted across sessions.
        </p>
      </div>
    </div>
  );
};

export default Settings;
