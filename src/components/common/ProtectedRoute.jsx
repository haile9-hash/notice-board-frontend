import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { checkPermission } from '../../utils/permissions';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useContext(AuthContext);
  if (!user || !checkPermission(user.role, requiredRole)) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;