import React, { useState } from 'react';
import { useEmployee } from '../context/EmployeeContext';
import EmployeeFormModel from '../components/EmployeeFormModel';

const AdminDashboard = () => {
  const { employees, deleteEmployee } = useEmployee();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  // Opens modal pre-filled with data for Update
  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setIsModalOpen(true);
  };

  // Opens empty modal for Create
  const handleAddNew = () => {
    setEditingEmployee(null);
    setIsModalOpen(true);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Employee Directory</h1>
        <button onClick={handleAddNew} style={styles.addBtn}>+ Add Employee</button>
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Department</th>
              <th style={styles.th}>Position</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp.id} style={styles.tr}>
                <td style={styles.td}>{emp.name}</td>
                <td style={styles.td}>{emp.email}</td>
                <td style={styles.td}>{emp.department}</td>
                <td style={styles.td}>{emp.position}</td>
                <td style={styles.td}>
                  <button onClick={() => handleEdit(emp)} style={styles.editBtn}>Edit</button>
                  <button onClick={() => deleteEmployee(emp.id)} style={styles.deleteBtn}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <EmployeeFormModel employee={editingEmployee} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

const styles = {
  container: { padding: '2rem', maxWidth: '1000px', margin: '0 auto' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' },
  title: { color: '#1e293b', margin: 0 },
  addBtn: { padding: '0.75rem 1.5rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
  tableContainer: { backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', overflow: 'hidden' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { backgroundColor: '#f8fafc', padding: '1rem', textAlign: 'left', color: '#475569', borderBottom: '2px solid #e2e8f0' },
  tr: { borderBottom: '1px solid #e2e8f0' },
  td: { padding: '1rem', color: '#1e293b' },
  editBtn: { padding: '0.4rem 0.8rem', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '0.5rem', fontWeight: 'bold' },
  deleteBtn: { padding: '0.4rem 0.8rem', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }
};

export default AdminDashboard;