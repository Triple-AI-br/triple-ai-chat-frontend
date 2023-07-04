import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import axios from "axios";

const ACCESS_TOKEN_KEY = "jwt";
const BASE_API_URL = process.env.REACT_APP_BASE_API_URL as string;

interface IIncomingTokenCredentials {
    access_token: string;
    token_type: string;
}

interface IState {
    status: "idle" | "loading" | "failed" | "succeeded";
    accessToken: string;
    isAuthenticated: boolean;
    error?: string;
}
const getAccessTokenFromLocalStorage = () =>
    localStorage.getItem(ACCESS_TOKEN_KEY);

const setAccessTokenToLocalStorage = (accessToken: string) =>
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);

const _initialAccessToken = getAccessTokenFromLocalStorage() || "";

const initialState: IState = {
    status: "idle",
    accessToken: _initialAccessToken,
    isAuthenticated: Boolean(_initialAccessToken),
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(actionLogin.pending, state => {
                state.status = "loading";
                state.error = undefined;
            })
            .addCase(actionLogin.fulfilled, (state, action) => {
                const { access_token: accessToken } = action.payload;
                state.accessToken = accessToken;
                state.isAuthenticated = true;
                setAccessTokenToLocalStorage(accessToken);
            })
            .addCase(actionLogin.rejected, state => {
                state.error = "Failed to authenticate user";
            });
    },
});

// Actions
export const actionLogin = createAsyncThunk(
    "auth/login",
    async ({ email, password }: { email: string; password: string }) => {
        const url = `${BASE_API_URL}/api/v1/login/access-token`;
        const formdata = new FormData();
        formdata.append("username", email);
        formdata.append("password", password);
        const response = await axios.post(url, formdata);
        const data: IIncomingTokenCredentials = response.data;
        return data;
    }
);

// Selectors
export const selectIsAuthenticated = (state: RootState) =>
    state.auth.isAuthenticated;
export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectError = (state: RootState) => state.auth.error;

// Reducer
export const authSliceReducer = authSlice.reducer;
