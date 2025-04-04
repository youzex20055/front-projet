import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user?.jwt) {
      setIsAuthenticated(true);
      setUser(user);
    }
  }, []);

  const login = async (email, password) => {
    const response = await authService.login(email, password);
    if (response.jwt) {
      setIsAuthenticated(true);
      setUser(response);
      return response;
    }
    return null;
  };

  const register = async (username, email, password) => {
    const response = await authService.register(username, email, password);
    if (response.jwt) {
      setIsAuthenticated(true);
      setUser(response);
      return response;
    }
    return null;
  };

  const logout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};