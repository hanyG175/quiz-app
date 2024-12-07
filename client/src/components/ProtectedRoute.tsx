import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  const adminLoggedIn = localStorage.getItem('adminLoggedIn');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  if (!adminLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
