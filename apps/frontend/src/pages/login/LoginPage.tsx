import { Box, Button, FormControl, Typography } from '@mui/material';
import { loginThunk } from '../../features/login/loginSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { FormContainer, TextFieldElement } from 'react-hook-form-mui';

interface FormProps {
  email: string;
  password: string;
}

export const LoginPage = () => {
  const dispatch = useAppDispatch();
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
          textAlign: 'center',
        }}
      >
        <FormContainer onSuccess={(data: FormProps) => dispatch(loginThunk({ body: data }))}>
          <FormControl
            fullWidth={true}
            sx={{
              '& > *:not(:last-child)': {
                marginBottom: '20px',
              },
            }}
          >
            <Typography variant='h4'>Dockops Board Login</Typography>
            <TextFieldElement name='email' label='email' type='email' required={true} />
            <TextFieldElement name='password' label='password' type='password' required={true} />
            <Button type='submit' sx={{ mb: 2 }}>
              Login
            </Button>
          </FormControl>
        </FormContainer>
      </Box>
    </Box>
  );
};
