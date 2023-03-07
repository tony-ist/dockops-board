import { AppDispatch, RootState } from './storeTypes';

export interface ThunkAPI {
  dispatch: AppDispatch;
  state: RootState;
  rejectedMeta: {
    status?: number;
  };
}
