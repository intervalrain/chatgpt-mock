import React, { createContext, useContext, useState, useEffect } from 'react';
import { authenticate } from '@/app/api/auth/[...nextauth]/route';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: () => Promise<void>;
  logout: () => void;
}

interface User {
  userId: string;
  userName: string;
  email: string;
}

const MockUser: User = {
  userId: "00053997",
  userName: "Rain Hu",
  email: "rain_hu@rainspace.com",
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(MockUser);

  useEffect(() => {
    checkAuthStatus();
    login();
  }, []);

  const checkAuthStatus = () => {
    const token = localStorage.getItem('token');
    const expireTime = localStorage.getItem('tokenExpireTime');
    
    if (token && expireTime && new Date().getTime() < parseInt(expireTime)) {
      setIsAuthenticated(true);
      setUser({
        userId: localStorage.getItem('userId') || '',
        userName: localStorage.getItem('userName') || '',
        email: localStorage.getItem('email') || '',
      });
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const login = async () => {
    try {
      const response = await authenticate();
      setIsAuthenticated(true);
      setUser({
        userId: response.userId,
        userName: response.userName,
        email: response.email,
      });
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpireTime');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('email');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};