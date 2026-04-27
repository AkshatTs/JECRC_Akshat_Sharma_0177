import { NavLink, Outlet, useNavigate } from 'react-router-dom';

function DashboardLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  return (
    <div className="dashboard-shell">
      <header className="dashboard-header">
        <div className="brand">
          <h2>Dashboard</h2>
          <span>Insights & settings</span>
        </div>

        <nav className="dashboard-nav">
          <NavLink to="/dashboard">Home</NavLink>
          <NavLink to="/dashboard/analytics">Analytics</NavLink>
          <NavLink to="/dashboard/settings">Settings</NavLink>
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <main className="dashboard-main">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;