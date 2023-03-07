import { Middleware } from 'redux';
import { loginActions, loginThunk } from '../../features/login/loginSlice';

export const jwtTokenMiddleware: Middleware = (store) => (next) => (action) => {
  if (action.meta.status === 401) {
    store.dispatch(loginActions.logout());
  }

  if (loginThunk.fulfilled.match(action)) {
    localStorage.setItem('jwtToken', action.payload);
  }

  if (loginActions.logout.match(action)) {
    localStorage.removeItem('jwtToken');
  }

  return next(action);
};
