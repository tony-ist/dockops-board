import React from 'react';
import { useAppSelector } from '../../store/hooks';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = () => {
  const jwtToken = useAppSelector((state) => state.login.jwtToken);

  return jwtToken ? <Outlet /> : <Navigate to="/login" />;
};
