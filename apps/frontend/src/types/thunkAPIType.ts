import { AppDispatch, RootState } from './storeTypes';

export interface ThunkAPI {
  dispatch: AppDispatch;
  state: RootState;
  rejectedMeta: {
    message?: string;
    status?: number;
  };
}
