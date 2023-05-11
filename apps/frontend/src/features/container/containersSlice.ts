import { createAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { Status } from '../../types/statusType';
import { NullableError } from '../../types/nullableErrorType';
import { api, createAppAsyncThunk } from '../../api/backend-api';
import { RootState } from '../../types/storeTypes';
import { Container } from '../../generated-sources/backend-api';
import { loginThunk } from '../login/loginSlice';
import { fetchContainerByIdThunk } from './getContainerSlice';
import { createContainerActions } from './createContainerSlice';
import { WSContainerUpdateResponsePayload } from 'common-src';
import { EntityId } from '@reduxjs/toolkit/src/entities/models';

const containersAdapter = createEntityAdapter<Container>();

interface ContainersState {
  status: Status;
  error: NullableError;
}

const initialState = containersAdapter.getInitialState<ContainersState>({
  status: 'idle',
  error: null,
});

export const fetchContainersThunk = createAppAsyncThunk('containers/fetchContainers', api.v1ContainerAllGet.bind(api));
const wsContainerUpdateSuccess = createAction<WSContainerUpdateResponsePayload>('containers/update');

const containersSlice = createSlice({
  name: 'containers',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchContainersThunk.pending, (state) => {
        state.error = null;
        state.status = 'loading';
      })
      .addCase(fetchContainersThunk.fulfilled, (state, action) => {
        state.error = null;
        state.status = 'succeeded';
        containersAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchContainersThunk.rejected, (state, action) => {
        state.error = action.error.message ?? 'Unknown error';
        state.status = 'failed';
      })
      .addCase(fetchContainerByIdThunk.fulfilled, (state, action) => {
        containersAdapter.upsertOne(state, action.payload);
      })
      .addCase(createContainerActions.wsSuccess, (state, action) => {
        containersAdapter.upsertOne(state, action.payload.container);
      })
      .addCase(containersActions.wsContainerUpdateSuccess, (state, action) => {
        containersAdapter.upsertOne(state, action.payload.container);
      })
      .addCase(loginThunk.fulfilled, () => initialState);
  },
});

const containersAdapterSelectors = containersAdapter.getSelectors<RootState>((state) => state.containers);
const selectByNullableId = (state: RootState, id: EntityId | null) =>
  id ? containersAdapterSelectors.selectById(state, id) : null;

export const containersActions = {
  wsContainerUpdateSuccess,
  ...containersSlice.actions,
};
export const containersReducer = containersSlice.reducer;
export const containersSelectors = {
  ...containersAdapterSelectors,
  selectByNullableId,
};
