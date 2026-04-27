import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/App.css';

import BillCreator from './pages/BillCreator';
import CatalogManagement from './pages/CatalogManagement';
import BillHistory from './pages/BillHistory';
import Dashboard from './pages/Dashboard';

function App() {
  const [bills, setBills] = useState([]);
  const [catalogs, setCatalogs] = useState({});

  useEffect(() => {
    // Load from localStorage on mount
    const savedBills = localStorage.getItem('bills');
    const savedCatalogs = localStorage.getItem('catalogs');
    
    if (savedBills) setBills(JSON.parse(savedBills));
    if (savedCatalogs) setCatalogs(JSON.parse(savedCatalogs));
    else initializeDefaultCatalogs();
  }, []);

  const initializeDefaultCatalogs = () => {
    const defaultCatalogs = {
      entrance: [
        { id: 1, name: 'Adult', price: 50, category: 'Entrance Fee' },
        { id: 2, name: 'Child', price: 25, category: 'Entrance Fee' },
        { id: 3, name: 'Senior', price: 30, category: 'Entrance Fee' },
        { id: 4, name: 'VIP', price: 100, category: 'Entrance Fee' }
      ],
      donation: [
        { id: 1, name: 'Small Donation', price: 100, category: 'Donation' },
        { id: 2, name: 'Medium Donation', price: 500, category: 'Donation' },
        { id: 3, name: 'Large Donation', price: 1000, category: 'Donation' }
      ],
      selling: [
        { id: 1, name: 'T-Shirt', price: 200, category: 'Merchandise' },
        { id: 2, name: 'Cap', price: 150, category: 'Merchandise' },
        { id: 3, name: 'Water Bottle', price: 100, category: 'Food & Beverage' },
        { id: 4, name: 'Snacks', price: 50, category: 'Food & Beverage' }
      ]
    };
    setCatalogs(defaultCatalogs);
    localStorage.setItem('catalogs', JSON.stringify(defaultCatalogs));
  };

  const saveBills = (newBills) => {
    setBills(newBills);
    localStorage.setItem('bills', JSON.stringify(newBills));
  };

  const saveCatalogs = (newCatalogs) => {
    setCatalogs(newCatalogs);
    localStorage.setItem('catalogs', JSON.stringify(newCatalogs));
  };

  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-logo">
              Bill Generator
            </Link>
            <ul className="nav-menu">
              <li><Link to="/" className="nav-link">Dashboard</Link></li>
              <li><Link to="/create-bill" className="nav-link">Create Bill</Link></li>
              <li><Link to="/catalogs" className="nav-link">Catalogs</Link></li>
              <li><Link to="/history" className="nav-link">History</Link></li>
            </ul>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard bills={bills} />} />
            <Route 
              path="/create-bill" 
              element={<BillCreator bills={bills} onSaveBill={saveBills} catalogs={catalogs} />} 
            />
            <Route 
              path="/catalogs" 
              element={<CatalogManagement catalogs={catalogs} onSaveCatalogs={saveCatalogs} />} 
            />
            <Route path="/history" element={<BillHistory bills={bills} onDeleteBill={saveBills} />} />
          </Routes>
        </main>

        <ToastContainer 
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </Router>
  );
}

export default App;
