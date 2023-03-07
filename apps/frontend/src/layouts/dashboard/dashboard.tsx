import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { SideBar } from '../../components/sidebar/SideBar';
import { Header } from '../../components/header/Header';

export const DashboardLayout = (props: { children: React.ReactNode }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header></Header>
      <SideBar></SideBar>

      <Box sx={{ flexGrow: 1, p: { md: 3, sm: 1, xs: 1 }, mt: 8 }}>{props.children}</Box>
    </Box>
  );
};
