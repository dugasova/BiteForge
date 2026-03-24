import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import Loader from './Loader/Loader';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = UserAuth();

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
}
