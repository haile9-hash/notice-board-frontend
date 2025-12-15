import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useContext(AuthContext);
  
  // If no user is logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  // Check if user has required role
  const hasPermission = Array.isArray(requiredRole) 
    ? requiredRole.includes(user.role)
    : user.role === requiredRole;
  
  // If user doesn't have permission, redirect to their dashboard
  if (!hasPermission) {
    return <Navigate to={`/${user.role}-dashboard`} />;
  }
  
  // User has permission, show the protected content
  return children;
};

export default ProtectedRoute;