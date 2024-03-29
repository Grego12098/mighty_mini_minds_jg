import { Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from './auth/AuthProvider';
import { useContext } from 'react';

export default function SkipLogin() {
  const { session } = useContext(AuthContext);

  return session ? <Navigate to="/welcomePage" /> : <Outlet />;
}
