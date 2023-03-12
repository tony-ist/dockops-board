import { Configuration, DefaultApi } from '../generated-sources/backend-api';
import { ThunkAPI } from '../types/thunkAPIType';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';

export const api = new DefaultApi(
  new Configuration({
    basePath: import.meta.env.VITE_BACKEND_URL,
  })
);

type ApiMethodWithPayload<Request, Response> = (request: Request, options?: AxiosRequestConfig) => Promise<Response>;
type ApiMethodWithoutPayload<Response> = (options?: AxiosRequestConfig) => Promise<Response>;

type ApiMethodOverload<Request, Response> = ApiMethodWithoutPayload<Response> | ApiMethodWithPayload<Request, Response>;

function isApiMethodWithPayload<Request, Response>(
  apiMethod: ApiMethodOverload<Request, Response>,
  request: Request | undefined
): apiMethod is ApiMethodWithPayload<Request, Response> {
  return request !== undefined;
}

type ResponsePayload<T> = { data: T };

export function createAppAsyncThunk<Request, Response>(
  typePrefix: string,
  apiMethod: ApiMethodOverload<Request, ResponsePayload<Response>>
) {
  return createAsyncThunk<Response, Request, ThunkAPI>(typePrefix, async (request, thunkAPI) => {
    try {
      const options = {
        withCredentials: true,
        headers: { Authorization: `Bearer ${thunkAPI.getState().login.jwtToken}` },
      };
      const response = isApiMethodWithPayload(apiMethod, request)
        ? await apiMethod(request, options)
        : await apiMethod(options);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.message, {
          message: error.response?.data.message,
          status: error?.response?.status,
        });
      }
      return thunkAPI.rejectWithValue(`Unknown error: ${error}`, {});
    }
  });
}
