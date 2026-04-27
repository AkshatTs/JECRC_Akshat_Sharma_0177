import React, { createContext, useState, useCallback } from 'react';

/**
 * EmployeeContext - Global Employee Management Context
 * Handles CRUD operations for employee records (in-memory storage)
 * In production, connect this to SQLite backend API
 */
export const EmployeeContext = createContext();

/**
 * EmployeeProvider Component
 * Provides employee data and CRUD functions to all child components
 * Maintains employee records in-memory (would use SQLite in production)
 */
export const EmployeeProvider = ({ children }) => {
  // Initial mock employee data
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: 'Rajesh Kumar',
      email: 'rajesh@company.com',
      department: 'Engineering',
      position: 'Senior Developer',
      salary: 850000,
      joinDate: '2022-01-15',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Priya Singh',
      email: 'priya@company.com',
      department: 'Marketing',
      position: 'Marketing Manager',
      salary: 650000,
      joinDate: '2021-06-20',
      status: 'Active',
    },
    {
      id: 3,
      name: 'Amit Patel',
      email: 'amit@company.com',
      department: 'Sales',
      position: 'Sales Executive',
      salary: 550000,
      joinDate: '2023-03-10',
      status: 'Active',
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Get all employees
   * Returns the current list of all employees
   */
  const getEmployees = useCallback(() => {
    return employees;
  }, [employees]);

  /**
   * Get single employee by ID
   * @param {number} id - Employee ID to retrieve
   * @returns {object} Employee object or null if not found
   */
  const getEmployeeById = useCallback(
    (id) => {
      return employees.find((emp) => emp.id === id) || null;
    },
    [employees]
  );

  /**
   * Add new employee - CREATE operation
   * @param {object} employeeData - New employee data object
   * @returns {boolean} Success status
   */
  const addEmployee = useCallback((employeeData) => {
    setLoading(true);
    setError(null);

    // Simulate API call delay
    setTimeout(() => {
      try {
        // Validate required fields
        if (
          !employeeData.name ||
          !employeeData.email ||
          !employeeData.department
        ) {
          throw new Error('Missing required fields');
        }

        // Generate unique ID
        const newEmployee = {
          ...employeeData,
          id: Math.max(...employees.map((e) => e.id), 0) + 1,
        };

        setEmployees((prev) => [...prev, newEmployee]);
        setLoading(false);
        return true;
      } catch (err) {
        setError(err.message);
        setLoading(false);
        return false;
      }
    }, 500);
  }, [employees]);

  /**
   * Update existing employee - UPDATE operation
   * @param {number} id - Employee ID to update
   * @param {object} updatedData - Updated employee data
   * @returns {boolean} Success status
   */
  const updateEmployee = useCallback(
    (id, updatedData) => {
      setLoading(true);
      setError(null);

      // Simulate API call delay
      setTimeout(() => {
        try {
          const employee = employees.find((emp) => emp.id === id);
          if (!employee) {
            throw new Error('Employee not found');
          }

          // Update employee while maintaining immutability
          setEmployees((prev) =>
            prev.map((emp) =>
              emp.id === id ? { ...emp, ...updatedData } : emp
            )
          );
          setLoading(false);
          return true;
        } catch (err) {
          setError(err.message);
          setLoading(false);
          return false;
        }
      }, 500);
    },
    [employees]
  );

  /**
   * Delete employee - DELETE operation
   * @param {number} id - Employee ID to delete
   * @returns {boolean} Success status
   */
  const deleteEmployee = useCallback((id) => {
    setLoading(true);
    setError(null);

    // Simulate API call delay
    setTimeout(() => {
      try {
        const employee = employees.find((emp) => emp.id === id);
        if (!employee) {
          throw new Error('Employee not found');
        }

        setEmployees((prev) => prev.filter((emp) => emp.id !== id));
        setLoading(false);
        return true;
      } catch (err) {
        setError(err.message);
        setLoading(false);
        return false;
      }
    }, 500);
  }, [employees]);

  /**
   * Get department statistics for analytics
   * Counts employees by department
   */
  const getDepartmentStats = useCallback(() => {
    const stats = {};
    employees.forEach((emp) => {
      stats[emp.department] = (stats[emp.department] || 0) + 1;
    });
    return stats;
  }, [employees]);

  /**
   * Get total employees count
   * Useful for dashboard metrics
   */
  const getTotalEmployees = useCallback(() => {
    return employees.length;
  }, [employees]);

  /**
   * Value object containing all employee state and methods
   */
  const value = {
    employees,
    loading,
    error,
    getEmployees,
    getEmployeeById,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    getDepartmentStats,
    getTotalEmployees,
  };

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  );
};

/**
 * Custom Hook - useEmployee
 * Simplifies accessing employee context in any component
 * Usage: const { employees, addEmployee } = useEmployee();
 */
export const useEmployee = () => {
  const context = React.useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployee must be used within EmployeeProvider');
  }
  return context;
};
