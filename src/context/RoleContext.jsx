import React, { createContext, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const RoleContext = createContext();

const RoleProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const role = user ? user.role : null;

  return (
    <RoleContext.Provider value={{ role }}>
      {children}
    </RoleContext.Provider>
  );
};

export default RoleProvider;