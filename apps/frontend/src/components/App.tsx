import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RootPage } from '../pages/root/RootPage';
import { createTheme, ThemeProvider } from '@mui/material';
import { LoginPage } from '../pages/login/LoginPage';
import { PrivateRoute } from './private-route/PrivateRoute';
import { CreateContainerPage } from '../pages/create-container/CreateContainerPage';
import { ContainerPage } from '../pages/container/ContainerPage';
import { PrivateLayout } from '../layouts/PrivateLayout';
import { MainLayout } from '../layouts/MainLayout';

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
      fontFamily: '"Segoe UI"',
      fontWeight: 600,
    },
  },
  components: {
    MuiFormLabel: {
      styleOverrides: {
        asterisk: { color: 'red' },
      },
    },
  },
});

export const App = () => {
  return (
    <ThemeProvider theme={appTheme}>
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route element={<PrivateRoute />}>
              <Route element={<PrivateLayout />}>
                <Route path='/' element={<RootPage />} />
                <Route path='/container/create' element={<CreateContainerPage />} />
                <Route path='/container/:id' element={<ContainerPage />} />
              </Route>
            </Route>
            <Route path='/login' element={<LoginPage />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};
