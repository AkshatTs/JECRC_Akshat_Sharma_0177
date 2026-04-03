import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Home = () => {
  const { t } = useLanguage();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>{t('homeTitle')}</h1>
        <p style={styles.text}>{t('homeDesc')}</p>
      </div>
    </div>
  );
};

const styles = {
  container: { display: 'flex', justifyContent: 'center', padding: '4rem 2rem' },
  card: { 
    backgroundColor: 'white', padding: '3rem', borderRadius: '8px', 
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)', maxWidth: '600px', textAlign: 'center' 
  },
  title: { color: '#333', marginBottom: '1rem' },
  text: { color: '#666', fontSize: '1.1rem', lineHeight: '1.5' }
};

export default Home;