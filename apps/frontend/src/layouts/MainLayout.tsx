import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { AlertSnackbar } from '../components/snackbar/AlertSnackbar';

export const MainLayout = () => {
  return (
    <>
      <Outlet />
      <AlertSnackbar />
    </>
  );
};
