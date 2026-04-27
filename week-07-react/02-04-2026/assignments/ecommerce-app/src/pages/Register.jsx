import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({
    name: '',
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

    if (form.name && form.email && form.password) {
      alert('Registration successful');
      navigate('/login');
    } else {
      alert('Please fill all fields');
    }
  };

  return (
    <div className="auth-card">
      <div className="auth-hero auth-hero-secondary">
        <div>
          <span>Create account</span>
          <h2 className="auth-title">Register</h2>
        </div>
        <p>Sign up to start exploring products, track orders, and manage your profile.</p>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          name="name"
          placeholder="Full name"
          value={form.name}
          onChange={handleChange}
        />

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
          placeholder="Choose a password"
          value={form.password}
          onChange={handleChange}
        />

        <button type="submit" className="auth-submit">Register</button>
      </form>

      <div className="auth-actions">
        <Link to="/" className="auth-return">Return to Home</Link>
      </div>

      <p className="auth-switch">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Register;