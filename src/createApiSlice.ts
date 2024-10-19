import {
  createSlice,
  PayloadAction,
  ThunkAction,
  Action,
} from "@reduxjs/toolkit";
import axios from "axios";

interface ApiState {
  data: any;
  loading: boolean;
  error: string | null;
}

const initialState: ApiState = {
  data: null,
  loading: false,
  error: null,
};

interface ApiSliceOptions {
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  params?: Record<string, any>;
}

export function createApiSlice(name: string, options: ApiSliceOptions) {
  const apiSlice = createSlice({
    name,
    initialState,
    reducers: {
      fetchStart: (state: ApiState) => {
        state.loading = true;
        state.error = null;
      },
      fetchSuccess: (state: ApiState, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      },
      fetchFailure: (state: ApiState, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      },
    },
  });

  const { fetchStart, fetchSuccess, fetchFailure } = apiSlice.actions;

  const fetchApiData =
    (): ThunkAction<void, ApiState, unknown, Action<string>> =>
    async (dispatch) => {
      dispatch(fetchStart());

      try {
        const response = await axios({
          url: options.endpoint,
          method: options.method,
          params: options.params,
        });
        dispatch(fetchSuccess(response.data));
      } catch (error: unknown) {
        if (error instanceof Error) {
          dispatch(fetchFailure(error.message));
        } else {
          dispatch(fetchFailure("Unknown error occurred"));
        }
      }
    };

  return {
    apiSlice,
    fetchApiData,
  };
}
