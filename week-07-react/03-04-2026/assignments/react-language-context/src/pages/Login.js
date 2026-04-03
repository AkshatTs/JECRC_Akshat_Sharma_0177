import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Login = () => {
  const { t } = useLanguage();

  return (
    <div style={styles.container}>
      <form style={styles.formCard} onSubmit={(e) => e.preventDefault()}>
        <h2 style={styles.title}>{t('loginTitle')}</h2>
        
        <div style={styles.inputGroup}>
          <label style={styles.label}>{t('emailLabel')}</label>
          <input type="email" style={styles.input} />
        </div>
        
        <div style={styles.inputGroup}>
          <label style={styles.label}>{t('passLabel')}</label>
          <input type="password" style={styles.input} />
        </div>
        
        <button type="submit" style={styles.button}>{t('submitBtn')}</button>
      </form>
    </div>
  );
};

const styles = {
  container: { display: 'flex', justifyContent: 'center', padding: '4rem 2rem' },
  formCard: { 
    backgroundColor: 'white', padding: '2rem', borderRadius: '8px', 
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px', boxSizing: 'border-box' 
  },
  title: { color: '#333', marginBottom: '1.5rem', textAlign: 'center' },
  inputGroup: { marginBottom: '1rem', display: 'flex', flexDirection: 'column' },
  label: { marginBottom: '0.5rem', color: '#555', fontSize: '0.9rem', fontWeight: 'bold' },
  input: { padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc', fontSize: '1rem' },
  button: { 
    width: '100%', padding: '0.75rem', backgroundColor: '#0070ad', 
    color: 'white', border: 'none', borderRadius: '4px', fontSize: '1rem', 
    cursor: 'pointer', marginTop: '1rem', fontWeight: 'bold'
  }
};

export default Login;