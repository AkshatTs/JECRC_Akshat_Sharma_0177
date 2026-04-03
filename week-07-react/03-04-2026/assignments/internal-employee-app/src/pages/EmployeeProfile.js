import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useEmployee } from '../context/EmployeeContext';

const EmployeeProfile = () => {
  const { currentUser } = useAuth();
  const { employees } = useEmployee();

  // Find current user's data from the context DB, fallback to their auth context info
  const myRecord = employees.find(emp => emp.email === currentUser.email) || currentUser;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>My Information</h1>
        <div style={styles.infoRow}>
          <span style={styles.label}>Full Name:</span>
          <span style={styles.value}>{myRecord.name}</span>
        </div>
        <div style={styles.infoRow}>
          <span style={styles.label}>Email Address:</span>
          <span style={styles.value}>{myRecord.email}</span>
        </div>
        <div style={styles.infoRow}>
          <span style={styles.label}>Department:</span>
          <span style={styles.value}>{myRecord.department || 'Not Assigned'}</span>
        </div>
        <div style={styles.infoRow}>
          <span style={styles.label}>Position:</span>
          <span style={styles.value}>{myRecord.position || 'Not Assigned'}</span>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { display: 'flex', justifyContent: 'center', padding: '4rem 1rem' },
  card: { backgroundColor: 'white', padding: '2.5rem', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '100%', maxWidth: '500px' },
  title: { marginTop: 0, color: '#1e293b', borderBottom: '2px solid #e2e8f0', paddingBottom: '1rem', marginBottom: '2rem' },
  infoRow: { display: 'flex', justifyContent: 'space-between', padding: '1rem 0', borderBottom: '1px solid #f1f5f9' },
  label: { color: '#64748b', fontWeight: 'bold' },
  value: { color: '#1e293b' }
};

export default EmployeeProfile;