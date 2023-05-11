import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RootPage } from '../pages/root/RootPage';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useEffect } from 'react';
import { webSocketActions } from '../features/web-socket/webSocketSlice';
import { createTheme, ThemeProvider } from '@mui/material';
import { LoginPage } from '../pages/login/LoginPage';
import { PrivateRoute } from './private-route/PrivateRoute';
import { CreateContainerPage } from '../pages/create-contaner/CreateContainerPage';
import { ContainerPage } from '../pages/container/ContainerPage';
import { DashboardLayout } from '../layouts/dashboard/dashboard';

const appTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      paper: '#ffffff',
      default: '#dddddd',
    },
  },
  typography: {
    fontFamily: 'RobotoMono-Regular',
    subtitle2: {
      fontWeight: 500,
    },
    body1: {
      fontWeight: 500,
    },
    button: {
      fontFamily: 'RobotoMono-SemiBold',
    },
  },
});

export const App = () => {
  const dispatch = useAppDispatch();
  const isWebSocketConnected = useAppSelector((state) => state.webSocket.isConnected);

  useEffect(() => {
    if (!isWebSocketConnected) {
      dispatch(webSocketActions.startConnecting());
    }
  }, [isWebSocketConnected]);

  if (!isWebSocketConnected) {
    return <div>Connecting to websocket...</div>;
  }

  return (
    <ThemeProvider theme={appTheme}>
      <Router>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path='/' element={<RootPage />} />
              <Route path='/container/create' element={<CreateContainerPage />} />
              <Route path='/container/:id' element={<ContainerPage />} />
            </Route>
          </Route>
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};
