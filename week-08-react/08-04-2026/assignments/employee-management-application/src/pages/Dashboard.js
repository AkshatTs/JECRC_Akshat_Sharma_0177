import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadEmployees } from '../redux/slices/employeeSlice';
import Navigation from '../components/Navigation';
import EmployeeForm from '../components/EmployeeForm';
import EmployeeList from '../components/EmployeeList';
import Notification from '../components/Notification';
import LoadingSpinner from '../components/LoadingSpinner';
import './Dashboard.css';

const Dashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const dispatch = useDispatch();
  const theme = useSelector(state => state.ui.theme);

  // Load employees from localStorage on mount
  useEffect(() => {
    const savedEmployees = localStorage.getItem('employees');
    if (savedEmployees) {
      try {
        dispatch(loadEmployees(JSON.parse(savedEmployees)));
      } catch (error) {
        console.error('Error loading employees from localStorage:', error);
      }
    }
  }, [dispatch]);

  // Save employees to localStorage whenever they change
  const employees = useSelector(state => state.employees.employees);
  useEffect(() => {
    if (employees.length > 0) {
      localStorage.setItem('employees', JSON.stringify(employees));
    }
  }, [employees]);

  const handleAddEmployee = () => {
    setEditingEmployee(null);
    setShowForm(true);
  };

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingEmployee(null);
  };

  return (
    <div className={`dashboard-container ${theme}`}>
      <Navigation />
      
      <div className="dashboard-main">
        <div className="dashboard-header">
          <div className="header-content">
            <h1>Employee Management Dashboard</h1>
            <p>Manage your company's employees with Redux state management</p>
          </div>
          <button
            onClick={handleAddEmployee}
            className="btn btn-primary btn-lg"
          >
            + Add New Employee
          </button>
        </div>

        <EmployeeList onEdit={handleEditEmployee} />
      </div>

      {showForm && (
        <EmployeeForm
          onClose={handleCloseForm}
          editingEmployee={editingEmployee}
        />
      )}

      <Notification />
      <LoadingSpinner />
    </div>
  );
};

export default Dashboard;
