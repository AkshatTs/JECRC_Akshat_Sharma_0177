import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteEmployee } from '../redux/slices/employeeSlice';
import { showNotification } from '../redux/slices/uiSlice';
import './EmployeeList.css';

const EmployeeList = ({ onEdit }) => {
  const employees = useSelector(state => state.employees.employees);
  const dispatch = useDispatch();

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      dispatch(deleteEmployee(id));
      dispatch(showNotification({
        type: 'success',
        message: `${name} has been deleted.`,
      }));
    }
  };

  if (employees.length === 0) {
    return (
      <div className="empty-state">
        <p>No employees found. Add your first employee to get started!</p>
      </div>
    );
  }

  return (
    <div className="employee-list-container">
      <div className="employee-list-header">
        <h2>Employee Directory ({employees.length})</h2>
      </div>

      <div className="table-responsive">
        <table className="employee-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Position</th>
              <th>Salary</th>
              <th>Join Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp.id} className="employee-row">
                <td className="emp-name">
                  <strong>{emp.name}</strong>
                </td>
                <td>{emp.email}</td>
                <td>
                  <span className="badge badge-primary">{emp.department}</span>
                </td>
                <td>{emp.position}</td>
                <td className="emp-salary">
                  ₹{parseFloat(emp.salary).toLocaleString()}
                </td>
                <td>{new Date(emp.joinDate).toLocaleDateString()}</td>
                <td className="actions">
                  <button
                    onClick={() => onEdit(emp)}
                    className="btn btn-sm btn-edit"
                    title="Edit employee"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(emp.id, emp.name)}
                    className="btn btn-sm btn-delete"
                    title="Delete employee"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="employee-statistics">
        <div className="stat-card">
          <h4>Total Employees</h4>
          <p className="stat-number">{employees.length}</p>
        </div>
        <div className="stat-card">
          <h4>Total Payroll</h4>
          <p className="stat-number">
            ₹{employees.reduce((sum, emp) => sum + parseFloat(emp.salary || 0), 0).toLocaleString()}
          </p>
        </div>
        <div className="stat-card">
          <h4>Departments</h4>
          <p className="stat-number">
            {new Set(employees.map(emp => emp.department)).size}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
