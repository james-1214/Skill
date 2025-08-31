// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { loginService, registerService, updateUserService, getUserService } from '../services/authService';
import { getItem, setItem, removeItem } from '../utils/storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getItem('user') || null);
  const [loading, setLoading] = useState(false);

  const login = async (credentials) => {
    setLoading(true);
    const response = await loginService(credentials);
    setUser(response);
    setItem('user', response);
    setLoading(false);
  };

  const register = async (data) => {
    setLoading(true);
    const response = await registerService(data);
    setUser(response);
    setItem('user', response);
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    removeItem('user');
  };

  const updateUser = async (data) => {
    const updatedUser = await updateUserService(data);
    setUser(updatedUser);
    setItem('user', updatedUser);
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (user) {
        const freshUser = await getUserService(user.email);
        setUser(freshUser);
      }
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
