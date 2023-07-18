import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import axios from "axios";
import { parseJwt } from "../utils/parseJwt";

const ACCESS_TOKEN_KEY = "jwt";
const BASE_API_URL = process.env.REACT_APP_BASE_API_URL as string;

interface IUserData {
    sub: string;
    email: string;
    is_superuser: boolean;
    is_admin: boolean;
    permissions: string[];
}

interface IIncomingTokenCredentials {
    access_token: string;
    token_type: string;
}

interface IState {
    status: "idle" | "loading" | "failed" | "succeeded";
    accessToken: string;
    isAuthenticated: boolean;
    error?: string;
    userData?: IUserData;
}
const getAccessTokenFromLocalStorage = () =>
    localStorage.getItem(ACCESS_TOKEN_KEY);

const setAccessTokenToLocalStorage = (accessToken: string) =>
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);

const _initialAccessToken = getAccessTokenFromLocalStorage() || "";

const userData = _initialAccessToken
    ? parseJwt(_initialAccessToken)
    : undefined;

const initialState: IState = {
    status: "idle",
    accessToken: _initialAccessToken,
    isAuthenticated: Boolean(_initialAccessToken),
    userData,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state) {
            state.isAuthenticated = false;
            localStorage.removeItem(ACCESS_TOKEN_KEY);
        },
    },
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
            })
            .addCase(actionAcceptInvite.pending, state => {
                state.status = "loading";
                state.error = undefined;
            })
            .addCase(actionAcceptInvite.fulfilled, (state, action) => {
                const { access_token: accessToken } = action.payload;
                state.accessToken = accessToken;
                state.isAuthenticated = true;
                setAccessTokenToLocalStorage(accessToken);
            })
            .addCase(actionAcceptInvite.rejected, state => {
                state.error = "Failed to authenticate user";
            });
    },
});

// Actions
export const { logout: actionLogout } = authSlice.actions;

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

export const actionAcceptInvite = createAsyncThunk(
    "auth/acceptInvite",
    async ({
        password,
        confirmPassword,
        token,
    }: {
        password: string;
        confirmPassword: string;
        token: string;
    }) => {
        if (password !== confirmPassword) {
            throw Error("Passwords dont match");
        }
        const url = `${BASE_API_URL}/api/v1/login/invited-set-password`;
        const response = await axios.post(url, { token, password });
        const data: IIncomingTokenCredentials = response.data;
        return data;
    }
);

// Selectors
export const selectIsAuthenticated = (state: RootState) =>
    state.auth.isAuthenticated;
export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectError = (state: RootState) => state.auth.error;
export const selectIsSuperUser = (state: RootState) =>
    state.auth.userData?.is_superuser;
export const selectIsAdminOrSuperUser = (state: RootState) =>
    state.auth.userData?.is_admin || state.auth.userData?.is_superuser;
export const selectHasPermission = (permission: string) => (state: RootState) =>
    state.auth.userData?.permissions.includes(permission);

// Reducer
export const authSliceReducer = authSlice.reducer;
