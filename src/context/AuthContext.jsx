import React, { createContext, useState, useEffect } from 'react';
import { mockUsers } from '../data/mockUsers';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (username, password) => {
    const foundUser = mockUsers.find(u => 
      u.username === username && u.password === password
    );
    
    if (foundUser) {
      const userData = {
        id: foundUser.id,
        username: foundUser.username,
        role: foundUser.role,
        name: foundUser.name,
        email: foundUser.email,
        faculty: foundUser.faculty
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true, user: userData };
    }
    return { success: false, message: 'Invalid credentials' };
  };

  const signup = (userData) => {
    // In real app, this would call an API
    const newUser = {
      ...userData,
      id: mockUsers.length + 1,
      role: 'user'
    };
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  useEffect(() => {
    // Auto-login check
    const savedUser = localStorage.getItem('user');
    if (savedUser && !user) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      signup, 
      logout, 
      updateUser,
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;