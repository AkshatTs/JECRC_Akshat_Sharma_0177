import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  // Handle form validation and login trigger
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const user = await login(email, password);
      navigate(user.role === 'admin' ? '/admin' : '/profile');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.card} onSubmit={handleLogin}>
        <h2 style={styles.title}>System Login</h2>
        
        {error && <div style={styles.error}>{error}</div>}

        <div style={styles.inputGroup}>
          <label style={styles.label}>Email Address</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} />
        </div>
        
        <button type="submit" disabled={isLoading} style={{...styles.button, opacity: isLoading ? 0.7 : 1}}>
          {isLoading ? 'Authenticating...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: { display: 'flex', justifyContent: 'center', padding: '5rem 1rem' },
  card: { backgroundColor: 'white', padding: '2.5rem', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px', boxSizing: 'border-box' },
  title: { textAlign: 'center', color: '#1e293b', marginBottom: '1.5rem' },
  error: { backgroundColor: '#fee2e2', color: '#b91c1c', padding: '0.75rem', borderRadius: '4px', marginBottom: '1rem', fontSize: '0.9rem' },
  inputGroup: { marginBottom: '1.25rem', display: 'flex', flexDirection: 'column' },
  label: { marginBottom: '0.5rem', color: '#475569', fontWeight: 'bold', fontSize: '0.9rem' },
  input: { padding: '0.75rem', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '1rem' },
  button: { width: '100%', padding: '0.75rem', backgroundColor: '#0284c7', color: 'white', border: 'none', borderRadius: '4px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }
};

export default Login;