import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { toggleTheme, showNotification } from '../redux/slices/uiSlice';
import './Navigation.css';

const Navigation = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const theme = useSelector(state => state.ui.theme);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(showNotification({
      type: 'success',
      message: 'Logged out successfully.',
    }));
    localStorage.removeItem('authSession');
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
    const newTheme = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('appTheme', newTheme);
  };

  return (
    <nav className={`navbar ${theme}`}>
      <div className="nav-container">
        <div className="nav-brand">
          <h1>EMS Dashboard</h1>
        </div>

        <div className="nav-content">
          <div className="user-info">
            <span className="user-badge">{user?.name}</span>
            <span className="user-department">{user?.department}</span>
          </div>

          <div className="nav-actions">
            <button
              onClick={handleThemeToggle}
              className="btn btn-icon"
              title="Toggle theme"
            >
              {theme === 'light' ? 'Dark' : 'Light'}
            </button>
            <button
              onClick={handleLogout}
              className="btn btn-secondary"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
