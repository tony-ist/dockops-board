import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { SideBar } from '../../components/sidebar/SideBar';
import { Header } from '../../components/header/Header';
import { Outlet } from 'react-router-dom';

export const DashboardLayout = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header />
      <SideBar />

      <Box sx={{ flexGrow: 1, p: { md: 3, sm: 1, xs: 1 }, marginTop: 8 }}>
        <Outlet />
      </Box>
    </Box>
  );
};
