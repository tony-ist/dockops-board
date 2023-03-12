import { Box, Button, FormHelperText, Typography } from '@mui/material';
import { loginThunk } from '../../features/login/loginSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Navigate } from 'react-router-dom';
import { FormContainer, TextFieldElement } from 'react-hook-form-mui';

interface FormProps {
  email: string;
  password: string;
}

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const loginStatus = useAppSelector((state) => state.login.status);

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
      <FormContainer onSuccess={(data: FormProps) => dispatch(loginThunk({ body: data }))}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: 2,
            textAlign: 'center',
            '& > *:not(:last-child)': {
              marginBottom: '20px',
            },
          }}
        >
          <Typography variant='h4'>Dockops Board Login</Typography>
          <TextFieldElement name='email' label='email' type='email' required={true} />
          <TextFieldElement name='password' label='password' type='password' required={true} />
          {loginStatus === 'failed' && (
            <FormHelperText variant='filled' filled={true} error={true}>
              Wrong email or password
            </FormHelperText>
          )}
          <Button type='submit' sx={{ mb: 2 }}>
            Login
          </Button>
        </Box>
      </FormContainer>
    </Box>
  );
};
