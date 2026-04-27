import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <nav style={styles.nav}>
      <div style={styles.logoGroup}>
        <h2 style={styles.logo}>{t('logo')}</h2>
        <div style={styles.links}>
          <Link to="/" style={styles.link}>{t('navHome')}</Link>
          <Link to="/about" style={styles.link}>{t('navAbout')}</Link>
          <Link to="/login" style={styles.link}>{t('navLogin')}</Link>
          <Link to="/register" style={styles.link}>{t('navRegister')}</Link>
        </div>
      </div>
      
      {/* Dropdown Language Selector */}
      <select 
        value={language} 
        onChange={(e) => setLanguage(e.target.value)}
        style={styles.select}
      >
        <option value="en">English</option>
        <option value="hi">हिंदी (Hindi)</option>
        <option value="ta">தமிழ் (Tamil)</option>
        <option value="fr">Français</option>
      </select>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '1rem 2rem', backgroundColor: '#0070ad', color: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  logoGroup: { display: 'flex', alignItems: 'center', gap: '2rem' },
  logo: { margin: 0, fontSize: '1.2rem', fontWeight: 'bold' },
  links: { display: 'flex', gap: '1.5rem' },
  link: { color: 'white', textDecoration: 'none', fontSize: '1rem', transition: '0.3s' },
  select: {
    padding: '0.5rem', borderRadius: '4px', border: 'none',
    backgroundColor: 'white', color: '#333', cursor: 'pointer', fontSize: '1rem',
    fontWeight: 'bold'
  }
};

export default Navbar;