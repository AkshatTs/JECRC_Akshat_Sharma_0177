import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import '../styles/components.css';

/**
 * Analytics Component
 * Displays detailed analytics and statistics about employees
 * Shows charts, breakdowns by department, salary ranges, etc.
 */
const Analytics = ({ stats }) => {
  const { getThemeColors } = useTheme();
  const colors = getThemeColors();

  /**
   * Calculate average salary from employees
   * Useful for salary analysis
   */
  const calculateAverageSalary = (employees) => {
    if (!employees || employees.length === 0) return 0;
    const total = employees.reduce((sum, emp) => sum + (emp.salary || 0), 0);
    return Math.round(total / employees.length);
  };

  /**
   * Calculate salary ranges distribution (in INR)
   * Groups employees by salary brackets
   */
  const getSalaryRanges = (employees) => {
    if (!employees || employees.length === 0) {
      return { 'Below 5L': 0, '5L-8L': 0, '8L-10L': 0, 'Above 10L': 0 };
    }

    const ranges = { 'Below 5L': 0, '5L-8L': 0, '8L-10L': 0, 'Above 10L': 0 };
    employees.forEach((emp) => {
      if (emp.salary < 500000) ranges['Below 5L']++;
      else if (emp.salary < 800000) ranges['5L-8L']++;
      else if (emp.salary < 1000000) ranges['8L-10L']++;
      else ranges['Above 10L']++;
    });
    return ranges;
  };

  /**
   * Get top earners from employee list
   * Returns top 5 highest paid employees
   */
  const getTopEarners = (employees) => {
    if (!employees || employees.length === 0) return [];
    return [...employees]
      .sort((a, b) => (b.salary || 0) - (a.salary || 0))
      .slice(0, 5);
  };

  /**
   * Calculate tenure statistics
   * Groups employees by years of service
   */
  const getTenureStats = (employees) => {
    if (!employees || employees.length === 0) {
      return { 'Less than 1 year': 0, '1-2 years': 0, '2-5 years': 0, '5+ years': 0 };
    }

    const now = new Date();
    const stats = { 'Less than 1 year': 0, '1-2 years': 0, '2-5 years': 0, '5+ years': 0 };

    employees.forEach((emp) => {
      const joinDate = new Date(emp.joinDate);
      const years = (now - joinDate) / (1000 * 60 * 60 * 24 * 365);

      if (years < 1) stats['Less than 1 year']++;
      else if (years < 2) stats['1-2 years']++;
      else if (years < 5) stats['2-5 years']++;
      else stats['5+ years']++;
    });

    return stats;
  };

  /**
   * Format currency for display (Indian Rupees)
   */
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const employees = stats?.employees || [];
  const avgSalary = calculateAverageSalary(employees);
  const salaryRanges = getSalaryRanges(employees);
  const topEarners = getTopEarners(employees);
  const tenureStats = getTenureStats(employees);

  return (
    <div className="analytics-container">
      <h1>Analytics & Reports</h1>
      <p className="section-subtitle">Detailed employee statistics and insights</p>

      {/* Key Metrics Grid */}
      <div className="metrics-grid">
        {/* Average Salary Metric */}
        <div className="metric-card" style={{ backgroundColor: colors.card }}>
          <div className="metric-icon">SALARY</div>
          <div className="metric-content">
            <h3>Average Salary</h3>
            <p className="metric-value">{formatCurrency(avgSalary)}</p>
            <p className="metric-label">Across all employees</p>
          </div>
        </div>

        {/* Total Departments Metric */}
        <div className="metric-card" style={{ backgroundColor: colors.card }}>
          <div className="metric-icon">DEPTS</div>
          <div className="metric-content">
            <h3>Departments</h3>
            <p className="metric-value">
              {Object.keys(stats?.departmentStats || {}).length}
            </p>
            <p className="metric-label">Organization structure</p>
          </div>
        </div>

        {/* Active Employees Metric */}
        <div className="metric-card" style={{ backgroundColor: colors.card }}>
          <div className="metric-icon">ACTIVE</div>
          <div className="metric-content">
            <h3>Active Employees</h3>
            <p className="metric-value">
              {employees.filter((e) => e.status === 'Active').length}
            </p>
            <p className="metric-label">Currently working</p>
          </div>
        </div>
      </div>

      {/* Salary Distribution Section */}
      <div className="analytics-section" style={{ backgroundColor: colors.card }}>
        <h2>Salary Distribution</h2>
        <div className="distribution-chart">
          {Object.entries(salaryRanges).map(([range, count]) => (
            <div key={range} className="distribution-bar">
              <div className="bar-label">{range}</div>
              <div className="bar-container">
                <div
                  className="bar-fill"
                  style={{
                    width: `${(count / Math.max(...Object.values(salaryRanges), 1)) * 100}%`,
                    backgroundColor: colors.primary,
                  }}
                />
              </div>
              <div className="bar-count">{count}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Department Statistics Section */}
      {stats?.departmentStats && Object.keys(stats.departmentStats).length > 0 && (
        <div className="analytics-section" style={{ backgroundColor: colors.card }}>
          <h2>Employees by Department</h2>
          <div className="department-stats">
            {Object.entries(stats.departmentStats).map(([dept, count]) => {
              const percentage = ((count / (stats.totalEmployees || 1)) * 100).toFixed(1);
              return (
                <div key={dept} className="dept-stat-row">
                  <span className="dept-name">{dept}</span>
                  <div className="stat-bar">
                    <div
                      className="stat-fill"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: colors.primary,
                      }}
                    />
                  </div>
                  <span className="stat-info">
                    {count} ({percentage}%)
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tenure Statistics Section */}
      <div className="analytics-section" style={{ backgroundColor: colors.card }}>
        <h2>Employee Tenure</h2>
        <div className="tenure-grid">
          {Object.entries(tenureStats).map(([tenure, count]) => (
            <div key={tenure} className="tenure-card">
              <div className="tenure-label">{tenure}</div>
              <div className="tenure-count">{count}</div>
              <div className="tenure-percentage">
                {((count / Math.max(employees.length, 1)) * 100).toFixed(0)}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Earners Section */}
      {topEarners.length > 0 && (
        <div className="analytics-section" style={{ backgroundColor: colors.card }}>
          <h2>Top Earners</h2>
          <div className="top-earners-list">
            {topEarners.map((emp, index) => (
              <div key={emp.id} className="earner-row">
                <span className="rank">#{index + 1}</span>
                <div className="earner-info">
                  <div className="earner-name">{emp.name}</div>
                  <div className="earner-position">{emp.position}</div>
                </div>
                <div className="earner-salary">{formatCurrency(emp.salary)}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;
