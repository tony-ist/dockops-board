import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { SideBar } from '../components/sidebar/SideBar';
import { Header } from '../components/header/Header';
import { Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useEffect } from 'react';
import { webSocketActions } from '../features/web-socket/webSocketSlice';

export const MainLayout = () => {
  const dispatch = useAppDispatch();
  const isWebSocketConnected = useAppSelector((state) => state.webSocket.isConnected);

  useEffect(() => {
    if (!isWebSocketConnected) {
      dispatch(webSocketActions.startConnecting());
    }
  }, [dispatch, isWebSocketConnected]);

  if (!isWebSocketConnected) {
    return <div>Connecting to websocket...</div>;
  }

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
