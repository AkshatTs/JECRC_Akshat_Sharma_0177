import React, { useState, useEffect } from 'react';
import { useEmployee } from '../context/EmployeeContext';

const EmployeeFormModel = ({ employee, onClose }) => {
  const { addEmployee, updateEmployee } = useEmployee();
  const [formData, setFormData] = useState({ name: '', email: '', position: '', department: '' });

  // Populate form if editing an existing employee
  useEffect(() => {
    if (employee) setFormData(employee);
  }, [employee]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic Form Validation
    if (!formData.name || !formData.email) {
      alert("Name and Email are required fields.");
      return;
    }

    if (employee) {
      updateEmployee(employee.id, formData);
    } else {
      addEmployee(formData);
    }
    onClose();
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.title}>{employee ? 'Edit Record' : 'New Employee Record'}</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name</label>
            <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={styles.input} />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={styles.input} />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Department</label>
            <input type="text" value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} style={styles.input} />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Job Position</label>
            <input type="text" value={formData.position} onChange={e => setFormData({...formData, position: e.target.value})} style={styles.input} />
          </div>
          
          <div style={styles.btnGroup}>
            <button type="button" onClick={onClose} style={styles.cancelBtn}>Cancel</button>
            <button type="submit" style={styles.saveBtn}>Save Record</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  modal: { backgroundColor: 'white', padding: '2rem', borderRadius: '8px', width: '100%', maxWidth: '400px', boxShadow: '0 10px 15px rgba(0,0,0,0.1)', boxSizing: 'border-box' },
  title: { marginTop: 0, color: '#1e293b', marginBottom: '1.5rem' },
  inputGroup: { marginBottom: '1rem', display: 'flex', flexDirection: 'column' },
  label: { marginBottom: '0.25rem', color: '#475569', fontSize: '0.9rem', fontWeight: 'bold' },
  input: { padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '1rem' },
  btnGroup: { display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' },
  cancelBtn: { padding: '0.5rem 1rem', backgroundColor: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  saveBtn: { padding: '0.5rem 1rem', backgroundColor: '#0ea5e9', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }
};

export default EmployeeFormModel;