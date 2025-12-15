// Mock auth service
export const login = async (username, password) => {
  return { token: 'mock-token', role: 'user' };  // Simulate API
};

export const signup = async (username, password) => {
  return { success: true };
};