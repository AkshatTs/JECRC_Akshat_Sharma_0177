import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import '../styles/components.css';

/**
 * EmployeeForm Component
 * Form for adding new employees or editing existing ones
 * Handles form validation and submission
 */
const EmployeeForm = ({ employee, onSubmit, onCancel, loading }) => {
  const { getThemeColors } = useTheme();
  const colors = getThemeColors();

  // Form state - initialized with employee data or empty defaults
  const [formData, setFormData] = useState({
    name: employee?.name || '',
    email: employee?.email || '',
    department: employee?.department || 'Engineering',
    position: employee?.position || '',
    salary: employee?.salary || '',
    joinDate: employee?.joinDate || '',
    status: employee?.status || 'Active',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  /**
   * Handle form input change - updates state for controlled inputs
   * @param {object} e - Change event from input field
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  /**
   * Handle input blur - marks field as touched for error display
   * Shows validation errors only after field is interacted with
   */
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    validateField(name, formData[name]);
  };

  /**
   * Validate individual field
   * @param {string} name - Field name to validate
   * @param {string} value - Field value to validate
   */
  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'name':
        if (!value.trim()) {
          error = 'Name is required';
        } else if (value.trim().length < 2) {
          error = 'Name must be at least 2 characters';
        }
        break;
      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!value.includes('@')) {
          error = 'Invalid email format';
        }
        break;
      case 'position':
        if (!value.trim()) {
          error = 'Position is required';
        }
        break;
      case 'salary':
        if (!value) {
          error = 'Salary is required';
        } else if (isNaN(value) || value < 0) {
          error = 'Salary must be a positive number';
        }
        break;
      case 'joinDate':
        if (!value) {
          error = 'Join date is required';
        }
        break;
      default:
        break;
    }

    if (error) {
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  /**
   * Validate all form fields
   * @returns {boolean} True if all fields are valid
   */
  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      validateField(key, formData[key]);
    });
    return Object.values(newErrors).every((error) => !error);
  };

  /**
   * Handle form submission
   * Validates form and calls onSubmit callback with form data
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mark all fields as touched for error display
    setTouched({
      name: true,
      email: true,
      department: true,
      position: true,
      salary: true,
      joinDate: true,
      status: true,
    });

    // Validate all fields
    const fieldsToValidate = ['name', 'email', 'position', 'salary', 'joinDate'];
    let isValid = true;

    fieldsToValidate.forEach((field) => {
      validateField(field, formData[field]);
      if (errors[field]) {
        isValid = false;
      }
    });

    if (isValid) {
      onSubmit({
        ...formData,
        salary: parseInt(formData.salary),
      });
    }
  };

  return (
    <div className="form-container">
      <div className="form-box" style={{ backgroundColor: colors.card }}>
        <h2>{employee ? 'Edit Employee' : 'Add New Employee'}</h2>

        <form onSubmit={handleSubmit} className="employee-form">
          {/* Name Field */}
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter employee name"
              disabled={loading}
              style={{
                borderColor: touched.name && errors.name ? '#dc3545' : colors.border,
              }}
            />
            {touched.name && errors.name && (
              <span className="error-text">{errors.name}</span>
            )}
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter email address"
              disabled={loading}
              style={{
                borderColor: touched.email && errors.email ? '#dc3545' : colors.border,
              }}
            />
            {touched.email && errors.email && (
              <span className="error-text">{errors.email}</span>
            )}
          </div>

          {/* Department Field */}
          <div className="form-group">
            <label htmlFor="department">Department</label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="Engineering">Engineering</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="HR">Human Resources</option>
              <option value="Finance">Finance</option>
              <option value="Operations">Operations</option>
            </select>
          </div>

          {/* Position Field */}
          <div className="form-group">
            <label htmlFor="position">Position *</label>
            <input
              type="text"
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="e.g., Senior Developer"
              disabled={loading}
              style={{
                borderColor: touched.position && errors.position ? '#dc3545' : colors.border,
              }}
            />
            {touched.position && errors.position && (
              <span className="error-text">{errors.position}</span>
            )}
          </div>

          {/* Salary Field */}
          <div className="form-group">
            <label htmlFor="salary">Annual Salary *</label>
            <input
              type="number"
              id="salary"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter salary amount"
              min="0"
              disabled={loading}
              style={{
                borderColor: touched.salary && errors.salary ? '#dc3545' : colors.border,
              }}
            />
            {touched.salary && errors.salary && (
              <span className="error-text">{errors.salary}</span>
            )}
          </div>

          {/* Join Date Field */}
          <div className="form-group">
            <label htmlFor="joinDate">Join Date *</label>
            <input
              type="date"
              id="joinDate"
              name="joinDate"
              value={formData.joinDate}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={loading}
              style={{
                borderColor: touched.joinDate && errors.joinDate ? '#dc3545' : colors.border,
              }}
            />
            {touched.joinDate && errors.joinDate && (
              <span className="error-text">{errors.joinDate}</span>
            )}
          </div>

          {/* Status Field */}
          <div className="form-group">
            <label htmlFor="status">Employment Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button
              type="submit"
              className="btn-submit"
              disabled={loading}
              style={{ backgroundColor: colors.primary }}
            >
              {loading ? 'Saving...' : employee ? 'Update Employee' : 'Add Employee'}
            </button>
            <button
              type="button"
              className="btn-cancel"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
