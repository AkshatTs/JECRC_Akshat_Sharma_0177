import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import '../styles/components.css';

/**
 * EmployeeList Component
 * Displays all employees in a table format
 * Allows viewing, editing, and deleting employees
 */
const EmployeeList = ({ employees, onEdit, onDelete, loading }) => {
  const { getThemeColors } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  
  const colors = getThemeColors();

  /**
   * Filter employees by search term (name, email, department)
   * Case-insensitive search
   */
  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /**
   * Sort employees by selected field
   * Allows sorting by name, department, or salary
   */
  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'department') {
      return a.department.localeCompare(b.department);
    } else if (sortBy === 'salary') {
      return b.salary - a.salary;
    }
    return 0;
  });

  /**
   * Format currency value for display in table (Indian Rupees)
   */
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  /**
   * Format date to readable format
   */
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US');
  };

  return (
    <div className="employee-list-container">
      <h1>Employee Management</h1>
      <p className="section-subtitle">View and manage all employee records</p>

      {/* Search and Filter Section */}
      <div className="search-filter-container" style={{ backgroundColor: colors.card }}>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by name, email, or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="sort-box">
          <label>Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="name">Name</option>
            <option value="department">Department</option>
            <option value="salary">Salary (High to Low)</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="results-info">
        <p>
          Showing <strong>{sortedEmployees.length}</strong> of{' '}
          <strong>{employees.length}</strong> employees
        </p>
      </div>

      {/* Employee Table */}
      {sortedEmployees.length > 0 ? (
        <div className="table-container" style={{ backgroundColor: colors.card }}>
          <table className="employee-table">
            <thead>
              <tr style={{ backgroundColor: colors.primary }}>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Position</th>
                <th>Salary</th>
                <th>Join Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td data-label="Name">{employee.name}</td>
                  <td data-label="Email">{employee.email}</td>
                  <td data-label="Department">{employee.department}</td>
                  <td data-label="Position">{employee.position}</td>
                  <td data-label="Salary">{formatCurrency(employee.salary)}</td>
                  <td data-label="Join Date">{formatDate(employee.joinDate)}</td>
                  <td data-label="Status">
                    <span
                      className="status-badge"
                      style={{
                        backgroundColor: employee.status === 'Active' ? '#28a745' : '#6c757d',
                      }}
                    >
                      {employee.status}
                    </span>
                  </td>
                  <td data-label="Actions">
                    <div className="action-buttons">
                      {/* Edit Button */}
                      <button
                        className="btn-edit"
                        onClick={() => onEdit(employee)}
                        disabled={loading}
                        title="Edit employee"
                      >
                        Edit
                      </button>
                      {/* Delete Button */}
                      <button
                        className="btn-delete"
                        onClick={() => onDelete(employee.id)}
                        disabled={loading}
                        title="Delete employee"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="no-data-message" style={{ backgroundColor: colors.card }}>
          <p>No employees found. Try adjusting your search filters.</p>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
