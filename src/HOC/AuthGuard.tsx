import React from 'react'
import { UserAuth } from '../context/AuthContext'
import { Navigate, useLocation } from 'react-router-dom'
import Loader from '../components/Loader/Loader';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = UserAuth();
  const { pathname } = useLocation();
  if (loading) {
    return <Loader />
  }
  if (!user) {
    return <Navigate to="/login" replace state={{ prevPath: pathname }} />
  }
  return children
}
