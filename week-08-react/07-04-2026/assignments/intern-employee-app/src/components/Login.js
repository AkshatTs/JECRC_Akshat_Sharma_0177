import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/components.css';

/**
 * Login Component
 * Handles user authentication with email and password
 * Displays login form and error messages
 */
const Login = () => {
  const { login, loading, error } = useAuth();
  
  // Local state for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');

  /**
   * Handle form submission - validates input and calls login function
   * Prevents default form submission behavior
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    // Client-side validation
    if (!email || !password) {
      setFormError('Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      setFormError('Please enter a valid email');
      return;
    }

    // Call login from auth context
    login(email, password);
  };

  /**
   * Handle input change - updates state for controlled component
   */
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Internal Employee Portal</h1>
        <p className="login-subtitle">Login to your account</p>

        <form onSubmit={handleSubmit} className="login-form">
          {/* Email Input Field */}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              disabled={loading}
              required
            />
          </div>

          {/* Password Input Field */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
              disabled={loading}
              required
            />
          </div>

          {/* Error Messages Display */}
          {error && <div className="error-message">{error}</div>}
          {formError && <div className="error-message">{formError}</div>}

          {/* Submit Button */}
          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Demo Credentials Info */}
        <div className="demo-credentials">
          <p><strong>Demo Credentials:</strong></p>
          <p>Email: demo@company.com</p>
          <p>Password: password123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
