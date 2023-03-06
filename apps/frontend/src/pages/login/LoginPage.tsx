import { Button, Input } from '@mui/material';
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
    return <Navigate to={'/'} replace={true} />;
  }

  function login() {
    dispatch(loginThunk({ email, password }));
  }

  return (
    <div>
      <Input onChange={(event) => setEmail(event.target.value)} placeholder='Email'></Input>
      <Input onChange={(event) => setPassword(event.target.value)} type='password' placeholder='Password'></Input>
      <Button onClick={login}>Login</Button>
    </div>
  );
};
