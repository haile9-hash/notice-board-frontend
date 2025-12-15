export const checkPermission = (userRole, requiredRole) => {
  if (requiredRole === 'superadmin') return userRole === 'superadmin';
  if (requiredRole === 'subadmin') return ['superadmin', 'subadmin'].includes(userRole);
  if (requiredRole === 'user') return true;  // Users can view
  return false;
};