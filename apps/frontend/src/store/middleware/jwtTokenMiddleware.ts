import { Middleware } from 'redux';
import { loginActions, loginThunk } from '../../features/login/loginSlice';

export const jwtTokenMiddleware: Middleware = () => (next) => (action) => {
  if (loginThunk.fulfilled.match(action)) {
    localStorage.setItem('jwtToken', action.payload);
  }

  if (loginActions.logout.match(action)) {
    localStorage.removeItem('jwtToken');
  }

  return next(action);
};
