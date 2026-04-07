import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { EmployeeProvider, useEmployee } from './contexts/EmployeeContext';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import Analytics from './components/Analytics';
import Settings from './components/Settings';
import './styles/App.css';
import './styles/components.css';
import './styles/theme.css';

/**
 * AppContent Component
 * Main application content wrapper that uses all contexts
 * Handles navigation and component rendering based on current page
 */
const AppContent = () => {
  const { isAuthenticated } = useAuth();
  const { theme } = useTheme();
  const {
    employees,
    loading,
    error,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    getDepartmentStats,
    getTotalEmployees,
  } = useEmployee();

  // Local state for page navigation
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showForm, setShowForm] = useState(false);

  /**
   * Apply theme to document
   * Dynamically sets the data-theme attribute on root element
   * Triggers theme-specific CSS styles
   */
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.className = theme === 'light' ? 'light-theme' : 'dark-theme';
  }, [theme]);

  /**
   * Handle employee edit action
   * Sets selected employee and shows form
   */
  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    setShowForm(true);
    setCurrentPage('employees');
  };

  /**
   * Handle employee delete action
   * Calls delete function and removes from list
   */
  const handleDeleteEmployee = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      deleteEmployee(id);
    }
  };

  /**
   * Handle form submission for add/edit employee
   * Determines if adding new or updating existing employee
   */
  const handleFormSubmit = (formData) => {
    if (selectedEmployee) {
      // Update existing employee
      updateEmployee(selectedEmployee.id, formData);
    } else {
      // Add new employee
      addEmployee(formData);
    }
    setShowForm(false);
    setSelectedEmployee(null);
  };

  /**
   * Handle form cancel - resets form state
   */
  const handleFormCancel = () => {
    setShowForm(false);
    setSelectedEmployee(null);
  };

  /**
   * Handle navigation between pages
   * Updates current page state
   */
  const handleNavigate = (page) => {
    setCurrentPage(page);
    setShowForm(false);
    setSelectedEmployee(null);
  };

  // If not authenticated, show login page
  if (!isAuthenticated) {
    return <Login />;
  }

  // Prepare statistics object for dashboard and analytics
  const stats = {
    employees,
    totalEmployees: getTotalEmployees(),
    departmentStats: getDepartmentStats(),
  };

  // Main application layout after authentication
  return (
    <div className="app-wrapper">
      {/* Navigation Bar - Fixed at top */}
      <Navbar active={currentPage} onNavigate={handleNavigate} />

      {/* Main Content Area */}
      <main className="main-content">
        {/* Show form when adding/editing employee */}
        {showForm ? (
          <EmployeeForm
            employee={selectedEmployee}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
            loading={loading}
          />
        ) : (
          <>
            {/* Dashboard Page */}
            {currentPage === 'dashboard' && <Dashboard stats={stats} />}

            {/* Employee Management Page */}
            {currentPage === 'employees' && (
              <div>
                <EmployeeList
                  employees={employees}
                  onEdit={handleEditEmployee}
                  onDelete={handleDeleteEmployee}
                  loading={loading}
                />
                <div style={{ marginTop: '30px', textAlign: 'center' }}>
                  <button
                    onClick={() => {
                      setSelectedEmployee(null);
                      setShowForm(true);
                    }}
                    className="btn-primary"
                    style={{ padding: '12px 24px', fontSize: '1rem' }}
                  >
                    Add New Employee
                  </button>
                </div>
              </div>
            )}

            {/* Analytics Page */}
            {currentPage === 'analytics' && <Analytics stats={stats} />}

            {/* Settings Page */}
            {currentPage === 'settings' && <Settings />}
          </>
        )}

        {/* Error Display */}
        {error && (
          <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f8d7da', color: '#721c24', borderRadius: '5px' }}>
            <strong>Error:</strong> {error}
          </div>
        )}
      </main>
    </div>
  );
};

/**
 * App Component
 * Root component that wraps all contexts
 * Provides ThemeProvider, AuthProvider, and EmployeeProvider to entire app
 */
const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <EmployeeProvider>
          <AppContent />
        </EmployeeProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
