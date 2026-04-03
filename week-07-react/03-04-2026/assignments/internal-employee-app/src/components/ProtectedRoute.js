import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRole }) => {
  const { currentUser } = useAuth();

  // Redirect to login if user is not authenticated
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Enforce role-based access control
  if (allowedRole && currentUser.role !== allowedRole) {
    return <Navigate to={currentUser.role === 'admin' ? '/admin' : '/profile'} replace />;
  }

  return children;
};

export default ProtectedRoute;