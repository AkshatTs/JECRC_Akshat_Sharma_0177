// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;





import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { EmployeeProvider } from './context/EmployeeContext';

import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeProfile from './pages/EmployeeProfile';

function App() {
  return (
    // Wrap entire app with global states
    <AuthProvider>
      <EmployeeProvider>
        <Router>
          <div style={{ backgroundColor: '#f1f5f9', minHeight: '100vh', fontFamily: 'Arial, sans-serif', margin: 0, padding: 0 }}>
            <Navbar />
            
            <Routes>
              {/* Redirect root to login */}
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<Login />} />
              
              {/* Restrict to Admins */}
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute allowedRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              
              {/* Restrict to Employees */}
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute allowedRole="employee">
                    <EmployeeProfile />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </div>
        </Router>
      </EmployeeProvider>
    </AuthProvider>
  );
}

export default App;