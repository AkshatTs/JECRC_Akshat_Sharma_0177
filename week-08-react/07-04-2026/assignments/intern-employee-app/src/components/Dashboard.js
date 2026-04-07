import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import '../styles/components.css';

/**
 * Dashboard Component
 * Main dashboard page showing key metrics and overview
 * Displays total employees, active users, and quick stats
 */
const Dashboard = ({ stats }) => {
  const { getThemeColors } = useTheme();
  const colors = getThemeColors();

  /**
   * Calculate total salary sum from employees data
   * Used for financial analytics display
   */
  const calculateTotalSalary = (employees) => {
    return employees.reduce((sum, emp) => sum + (emp.salary || 0), 0);
  };

  /**
   * Format currency value for display (Indian Rupees)
   * @param {number} value - Numeric value to format
   * @returns {string} Formatted currency string (e.g., "₹85,000")
   */
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const totalSalary = calculateTotalSalary(stats?.employees || []);

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <p className="section-subtitle">Welcome to your employee portal dashboard</p>

      {/* Dashboard Stats Grid */}
      <div className="stats-grid">
        {/* Total Employees Stat Card */}
        <div
          className="stat-card stat-card-employees"
          style={{
            backgroundColor: '#e8f4f8',
            borderLeft: `6px solid #007bff`,
            borderRadius: '12px',
          }}
        >
          <div className="stat-icon stat-icon-employees">
            <span className="stat-number">EMPLOYEES</span>
          </div>
          <div className="stat-content">
            <p className="stat-value stat-value-large">{stats?.totalEmployees || 0}</p>
            <p className="stat-label">Active staff members</p>
          </div>
        </div>

        {/* Total Salary Stat Card */}
        <div
          className="stat-card stat-card-payroll"
          style={{
            backgroundColor: '#f0f8e8',
            borderTop: `6px solid #28a745`,
            borderRadius: '12px',
          }}
        >
          <div className="stat-icon stat-icon-payroll">
            <span className="stat-number">PAYROLL</span>
          </div>
          <div className="stat-content">
            <p className="stat-value stat-value-large">{formatCurrency(totalSalary)}</p>
            <p className="stat-label">Annual salary budget</p>
          </div>
        </div>

        {/* Active Users Stat Card */}
        <div
          className="stat-card stat-card-active"
          style={{
            backgroundColor: '#fffef0',
            borderRight: `6px solid #ffc107`,
            borderRadius: '12px',
          }}
        >
          <div className="stat-icon stat-icon-active">
            <span className="stat-number">ACTIVE</span>
          </div>
          <div className="stat-content">
            <p className="stat-value stat-value-large">
              {stats?.employees?.filter((e) => e.status === 'Active').length || 0}
            </p>
            <p className="stat-label">Currently active</p>
          </div>
        </div>

        {/* Departments Count Card */}
        <div
          className="stat-card stat-card-departments"
          style={{
            backgroundColor: '#f0e8f8',
            borderBottom: `6px solid #17a2b8`,
            borderRadius: '12px',
          }}
        >
          <div className="stat-icon stat-icon-departments">
            <span className="stat-number">DEPTS</span>
          </div>
          <div className="stat-content">
            <p className="stat-value stat-value-large">
              {Object.keys(stats?.departmentStats || {}).length}
            </p>
            <p className="stat-label">Organization units</p>
          </div>
        </div>
      </div>

      {/* Department Breakdown Section */}
      {stats?.departmentStats && Object.keys(stats.departmentStats).length > 0 && (
        <div
          className="dashboard-section"
          style={{ backgroundColor: colors.card }}
        >
          <h2>Department Breakdown</h2>
          <div className="department-list">
            {Object.entries(stats.departmentStats).map(([dept, count]) => (
              <div key={dept} className="department-item">
                <span className="dept-name">{dept}</span>
                <div className="dept-bar">
                  <div
                    className="dept-bar-fill"
                    style={{
                      width: `${(count / (stats.totalEmployees || 1)) * 100}%`,
                    }}
                  />
                </div>
                <span className="dept-count">{count} employees</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Info Section */}
      <div
        className="dashboard-section"
        style={{
          backgroundColor: colors.card,
          borderLeft: `4px solid ${colors.primary}`,
        }}
      >
        <h2>Quick Information</h2>
        <ul className="info-list">
          <li>View detailed analytics in the Analytics tab</li>
          <li>Manage employee records in the Employees section</li>
          <li>Switch between light and dark theme using the toggle</li>
          <li>Adjust settings in the Settings page</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
