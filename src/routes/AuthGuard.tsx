import { type ReactNode } from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../components/Loader/Loader';

export default function AuthGuard({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const { pathname } = useLocation();

  if (loading) return <Loader />;
  if (!user) return <Navigate to="/login" replace state={{ prevPath: pathname }} />;

  return children;
}
