import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RootPage } from '../pages/root/RootPage';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useEffect } from 'react';
import { webSocketActions } from '../features/web-socket/webSocketSlice';
import { createTheme, ThemeProvider } from '@mui/material';
import { LoginPage } from '../pages/login/LoginPage';
import { PrivateRoute } from './private-route/PrivateRoute';

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
          </Route>
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};
