import React, { createContext, useState, useContext, useEffect } from 'react';

const EmployeeContext = createContext();

const initialMockData = [
  { id: 2, name: 'Anurag Bhardwaj', email: 'anurag@company.com', position: 'Software Engineer', department: 'IT' },
  { id: 3, name: 'Lakshay Mangal', email: 'lakshay@company.com', position: 'HR Specialist', department: 'HR' }
];

export const EmployeeProvider = ({ children }) => {
  // Load initial records from localStorage or fallback to mock data
  const [employees, setEmployees] = useState(() => {
    const savedData = localStorage.getItem('employeeData');
    return savedData ? JSON.parse(savedData) : initialMockData;
  });

  // Sync employee records to localStorage on every change
  useEffect(() => {
    localStorage.setItem('employeeData', JSON.stringify(employees));
  }, [employees]);

  // CRUD Operations
  const addEmployee = (employee) => {
    const newEmployee = { ...employee, id: Date.now() };
    setEmployees([...employees, newEmployee]);
    alert('Employee added successfully!');
  };

  const updateEmployee = (id, updatedData) => {
    setEmployees(employees.map(emp => emp.id === id ? { ...emp, ...updatedData } : emp));
    alert('Employee updated successfully!');
  };

  const deleteEmployee = (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      setEmployees(employees.filter(emp => emp.id !== id));
    }
  };

  return (
    <EmployeeContext.Provider value={{ employees, addEmployee, updateEmployee, deleteEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployee = () => useContext(EmployeeContext);