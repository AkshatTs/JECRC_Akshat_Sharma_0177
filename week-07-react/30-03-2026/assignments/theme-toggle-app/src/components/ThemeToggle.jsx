import { useState } from 'react';
import './ThemeToggle.css';

function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  const handleToggle = () => {
    setIsDark(!isDark);
  };

  return (
    <div className={isDark ? 'container dark' : 'container light'}>
      <div className="card">
        <h1>Toggle Theme</h1>
        <h2>Mode: {isDark ? 'Dark' : 'Light'}</h2>

        <button onClick={handleToggle}>
          {isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
      </div>
    </div>
  );
}

export default ThemeToggle;