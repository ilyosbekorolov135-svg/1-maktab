import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

// Token sessionStorage da saqlanadi
export function isAdminAuthenticated(): boolean {
  return sessionStorage.getItem('admin_token') === 'admin-token-123';
}

export function setAdminToken(token: string) {
  sessionStorage.setItem('admin_token', token);
}

export function clearAdminToken() {
  sessionStorage.removeItem('admin_token');
}

// Agar admin login qilmagan bo'lsa, login sahifasiga yo'naltiradi
export const ProtectedAdminRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  if (!isAdminAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
};
