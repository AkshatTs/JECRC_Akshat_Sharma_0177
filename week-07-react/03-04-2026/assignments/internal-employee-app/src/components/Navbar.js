import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { currentUser, logout } = useAuth();

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>Enterprise Portal</h2>
      
      {/* Only show navigation and logout if a user is logged in */}
      {currentUser && (
        <div style={styles.navContainer}>
          <div style={styles.links}>
            {currentUser.role === 'admin' ? (
              <NavLink to="/admin" style={styles.link} end>Dashboard</NavLink>
            ) : (
              <NavLink to="/profile" style={styles.link} end>My Profile</NavLink>
            )}
          </div>
          <div style={styles.userInfo}>
            <span style={styles.greeting}>{currentUser.name} ({currentUser.role})</span>
            <button onClick={logout} style={styles.logoutBtn}>Logout</button>
          </div>
        </div>
      )}
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "15px 40px", background: "#1e293b", color: "#fff",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
  },
  logo: { margin: 0 },
  navContainer: { display: "flex", alignItems: "center", gap: "2rem" },
  links: { display: "flex" },
  // Active state styling pattern
  link: ({ isActive }) => ({
    margin: "0 10px", textDecoration: "none",
    color: isActive ? "#38bdf8" : "#94a3b8",
    fontWeight: isActive ? "bold" : "normal",
    transition: "color 0.2s"
  }),
  userInfo: { display: "flex", alignItems: "center", gap: "1rem", borderLeft: "1px solid #475569", paddingLeft: "1rem" },
  greeting: { fontSize: "0.9rem", color: "#cbd5e1" },
  logoutBtn: { padding: "5px 15px", backgroundColor: "#ef4444", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }
};

export default Navbar;