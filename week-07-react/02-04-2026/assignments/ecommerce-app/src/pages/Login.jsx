import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.email && form.password) {
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/dashboard');
    } else {
      alert('Please enter email and password');
    }
  };

  return (
    <div className="auth-card">
      {/* <div className="auth-hero">
        <div>
          <span>Welcome Back</span>
          <h2 className="auth-title">Login</h2>
        </div>
        <p>Access your account securely and continue shopping with ease.</p>
      </div> */}

      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <button type="submit" className="auth-submit">Login</button>
      </form>

      <div className="auth-actions">
        <Link to="/" className="auth-return">Return to Home</Link>
      </div>

      <p className="auth-switch">
        Don’t have an account? <Link to="/register">Create one</Link>
      </p>
    </div>
  );
}

export default Login;