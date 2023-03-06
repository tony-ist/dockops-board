import { Middleware } from 'redux';
import { loginThunk } from '../../features/login/loginSlice';

export const jwtTokenMiddleware: Middleware = () => (next) => (action) => {
  if (loginThunk.fulfilled.match(action)) {
    localStorage.setItem('jwtToken', action.payload);
  }

  return next(action);
};
