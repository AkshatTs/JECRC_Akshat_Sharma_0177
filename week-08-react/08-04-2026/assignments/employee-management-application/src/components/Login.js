import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, setAuthError, clearAuthError } from '../redux/slices/authSlice';
import { showNotification } from '../redux/slices/uiSlice';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  
  const dispatch = useDispatch();
  const authError = useSelector(state => state.auth.error);
  const theme = useSelector(state => state.ui.theme);

  // Simple validation
  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    if (email && !email.includes('@')) newErrors.email = 'Valid email required';
    if (password && password.length < 4) newErrors.password = 'Password must be at least 4 characters';
    return newErrors;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      dispatch(setAuthError('Please fix the errors and try again'));
      return;
    }

    // Mock authentication
    if (email === 'admin@company.com' && password === 'password123') {
      dispatch(login({
        email,
        name: 'Admin User',
        department: 'HR',
      }));
      dispatch(showNotification({
        type: 'success',
        message: 'Login successful! Welcome back.',
      }));
      setErrors({});
      dispatch(clearAuthError());
      // Save session to localStorage
      localStorage.setItem('authSession', JSON.stringify({
        isLoggedIn: true,
        user: { email, name: 'Admin User', department: 'HR' }
      }));
    } else {
      dispatch(setAuthError('Invalid credentials. Try admin@company.com / password123'));
      dispatch(showNotification({
        type: 'error',
        message: 'Login failed. Check your credentials.',
      }));
    }
  };

  return (
    <div className={`login-container ${theme}`}>
      <div className="login-card">
        <div className="login-header">
          <h1>Employee Management System</h1>
          <p>Redux State Management Demo</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@company.com"
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password123"
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          {authError && <div className="alert alert-error">{authError}</div>}

          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>


      </div>
    </div>
  );
};

export default Login;
