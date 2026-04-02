import { NavLink, Outlet } from 'react-router-dom';

function MainLayout() {
  return (
    <div className="app-shell">
      <header className="main-header">
        <div className="brand">
          <h2>Shop</h2>
          <span>Modern shopping experience</span>
        </div>

        <nav className="nav-links">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/login">Login</NavLink>
        </nav>
      </header>

      <div className="main-area">
        <section className="page-top">
          <h1>E-Commerce App</h1>
          <p>Browse products, brand, and manage your shopping experiance.</p>
        </section>

        <main className="content">
          <Outlet />
        </main>

        <footer className="footer">
          <p>© 2026 Enterprise E-Commerce | All Rights Reserved</p>
        </footer>
      </div>
    </div>
  );
}

export default MainLayout;