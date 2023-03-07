import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RootPage } from '../pages/root/RootPage';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useEffect } from 'react';
import { webSocketActions } from '../features/web-socket/webSocketSlice';
import { createTheme, ThemeProvider } from '@mui/material';
import { LoginPage } from '../pages/login/LoginPage';
import { PrivateRoute } from './private-route/PrivateRoute';
import { CreateContainerPage } from '../pages/create-contaner/CreateContainer';

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
    fontFamily: 'Consolas',
    subtitle2: {
      fontWeight: 500,
    },
    body1: {
      fontWeight: 500,
    },
    button: {
      fontFamily: '"Segoe UI"',
      fontWeight: 600,
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
          <Route path='/' element={<PrivateRoute />}>
            <Route path='/' element={<RootPage />} />
            <Route path='/create-container' element={<CreateContainerPage />} />
          </Route>
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};
