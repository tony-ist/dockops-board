import { Box, Button, Input, Typography } from '@mui/material';
import { loginThunk } from '../../features/login/loginSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loginStatus = useAppSelector((state) => state.login.status);

  useEffect(() => {
    if (loginStatus === 'failed') {
      // TODO: Use MUI Alert
      window.alert('Wrong email or password');
    }
  }, [loginStatus]);

  if (loginStatus === 'succeeded') {
    return <Navigate to='/' replace={true} />;
  }

  function login() {
    dispatch(loginThunk({ body: { email, password } }));
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: 2,
          '& > *:not(:last-child)': {
            marginBottom: '20px',
          },
        }}
      >
        <Typography variant='h4'>Dockops Board Login</Typography>
        <Input onChange={(event) => setEmail(event.target.value)} type='email' placeholder='Email' />
        <Input onChange={(event) => setPassword(event.target.value)} type='password' placeholder='Password' />
        <Button onClick={login}>Login</Button>
      </Box>
    </Box>
  );
};
