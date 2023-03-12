import { Alert, Snackbar } from '@mui/material';
import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { snackbarActions } from '../../features/snackbar/snackbarSlice';

export const AlertSnackbar = () => {
  const dispatch = useAppDispatch();
  const snackbar = useAppSelector((state) => state.snackbar);

  const handleSnackbarClose = () => {
    dispatch(snackbarActions.close());
  };

  return (
    <Snackbar open={snackbar.isOpen} onClose={handleSnackbarClose}>
      <Alert severity='error'>{snackbar.message}</Alert>
    </Snackbar>
  );
};
