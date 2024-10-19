import { PayloadAction, ThunkAction, Action } from "@reduxjs/toolkit";
interface ApiState {
    data: any;
    loading: boolean;
    error: string | null;
}
interface ApiSliceOptions {
    endpoint: string;
    method: "GET" | "POST" | "PUT" | "DELETE";
    params?: Record<string, any>;
}
export declare function createApiSlice(name: string, options: ApiSliceOptions): {
    apiSlice: import("@reduxjs/toolkit").Slice<ApiState, {
        fetchStart: (state: ApiState) => void;
        fetchSuccess: (state: ApiState, action: PayloadAction<any>) => void;
        fetchFailure: (state: ApiState, action: PayloadAction<string>) => void;
    }, string, string, import("@reduxjs/toolkit").SliceSelectors<ApiState>>;
    fetchApiData: () => ThunkAction<void, ApiState, unknown, Action<string>>;
};
export {};
