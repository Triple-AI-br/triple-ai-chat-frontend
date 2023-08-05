import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import axios from "axios";
import { parseJwt } from "../utils/parseJwt";

const ACCESS_TOKEN_KEY = "jwt";
const CUSTOMER_DATA_KEY = "customerData";
const BASE_API_URL = process.env.REACT_APP_BASE_API_URL as string;

interface IUserData {
    sub: string;
    email: string;
    is_superuser: boolean;
    is_admin: boolean;
    permissions: string[];
    customer_id?: number;
}

export interface ICustomerData {
    id: number;
    name: string;
    main_color: string;
    logo_url: string;
}

export interface IIncomingTokenCredentials {
    access_token: string;
    token_type: string;
}

interface IState {
    status: "idle" | "loading" | "failed" | "succeeded";
    accessToken: string;
    isAuthenticated: boolean;
    error?: string;
    userData?: IUserData;
    customerData?: ICustomerData;
}

const getCustomer = async (
    customerId: number,
    token: string
): Promise<ICustomerData> => {
    const data = localStorage.getItem(CUSTOMER_DATA_KEY);
    if (data) {
        return JSON.parse(data);
    }
    const url = `${BASE_API_URL}/api/v1/customers/${customerId}`;
    const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
    });
    localStorage.setItem(CUSTOMER_DATA_KEY, JSON.stringify(res.data));
    return res.data;
};

const getCustomerDataFromLocalStorage = () =>
    localStorage.getItem(CUSTOMER_DATA_KEY);

const getAccessTokenFromLocalStorage = () =>
    localStorage.getItem(ACCESS_TOKEN_KEY);

const setCustomerDataToLocalStorage = (customerData: string) =>
    localStorage.setItem(CUSTOMER_DATA_KEY, customerData);

const setAccessTokenToLocalStorage = (accessToken: string) =>
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);

const _initialAccessToken = getAccessTokenFromLocalStorage() || "";
const _initialCustomerData = getCustomerDataFromLocalStorage() || "";

const customerData = _initialCustomerData
    ? JSON.parse(_initialCustomerData)
    : undefined;

const userData = _initialAccessToken
    ? parseJwt(_initialAccessToken)
    : undefined;

const initialState: IState = {
    status: "idle",
    accessToken: _initialAccessToken,
    isAuthenticated: Boolean(_initialAccessToken),
    userData,
    customerData,
};

(() => {
    (async () => {
        if (!customerData && userData) {
            const data = await getCustomer(
                userData.customer_id ?? 1,
                _initialAccessToken
            );
            setCustomerDataToLocalStorage(JSON.stringify(data));
        }
    })();
})();

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state) {
            state.isAuthenticated = false;
            localStorage.removeItem(ACCESS_TOKEN_KEY);
            localStorage.removeItem(CUSTOMER_DATA_KEY);
        },
    },
    extraReducers(builder) {
        builder
            .addCase(actionLogin.pending, state => {
                state.status = "loading";
                state.error = undefined;
            })
            .addCase(actionLogin.fulfilled, (state, action) => {
                const {
                    authData: { access_token: accessToken },
                    customerData,
                } = action.payload;
                state.accessToken = accessToken;
                state.isAuthenticated = true;
                state.customerData = customerData;
                setAccessTokenToLocalStorage(accessToken);
            })
            .addCase(actionLogin.rejected, state => {
                state.error = "Failed to authenticate user";
            })
            .addCase(actionAcceptInviteOrResetPassword.pending, state => {
                state.status = "loading";
                state.error = undefined;
            })
            .addCase(
                actionAcceptInviteOrResetPassword.fulfilled,
                (state, action) => {
                    const {
                        authData: { access_token: accessToken },
                        customerData,
                    } = action.payload;
                    state.accessToken = accessToken;
                    state.isAuthenticated = true;
                    state.customerData = customerData;
                    setAccessTokenToLocalStorage(accessToken);
                }
            )
            .addCase(actionAcceptInviteOrResetPassword.rejected, state => {
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
        const authResponse = await axios.post(url, formdata);
        const authData: IIncomingTokenCredentials = authResponse.data;
        const { customer_id: customerId }: IUserData = parseJwt(
            authData.access_token
        );
        const customerData = await getCustomer(
            customerId as number,
            authData.access_token
        );
        return { authData, customerData };
    }
);

export const actionAcceptInviteOrResetPassword = createAsyncThunk(
    "auth/acceptInvite",
    async ({
        password,
        confirmPassword,
        token,
        type,
    }: {
        type: "reset" | "invite";
        password: string;
        confirmPassword: string;
        token: string;
    }): Promise<{
        authData: IIncomingTokenCredentials;
        customerData: ICustomerData;
    }> => {
        if (password !== confirmPassword) {
            throw Error("Passwords dont match");
        }
        const url =
            type === "invite"
                ? `${BASE_API_URL}/api/v1/login/invited-set-password`
                : `${BASE_API_URL}/api/v1/login/reset-password`;
        const authResponse = await axios.post(url, { token, password });
        const authData: IIncomingTokenCredentials = authResponse.data;
        const { customer_id: customerId }: IUserData = parseJwt(
            authData.access_token
        );
        const customerData = await getCustomer(
            customerId as number,
            authData.access_token
        );
        return { authData, customerData };
    }
);

// Selectors
export const selectUserData = (state: RootState) => state.auth.userData;
export const selectCustomerId = (state: RootState) =>
    state.auth.userData?.customer_id;
export const selectCustomerData = (state: RootState) => state.auth.customerData;
export const selectIsAuthenticated = (state: RootState) =>
    state.auth.isAuthenticated;
export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectError = (state: RootState) => state.auth.error;
export const selectIsAdmin = (state: RootState) =>
    state.auth.userData?.is_admin;
export const selectIsSuperUser = (state: RootState) =>
    state.auth.userData?.is_superuser;
export const selectIsAdminOrSuperUser = (state: RootState) =>
    state.auth.userData?.is_admin || state.auth.userData?.is_superuser;
export const selectHasPermission = (permission: string) => (state: RootState) =>
    selectIsAdminOrSuperUser(state) ||
    state.auth.userData?.permissions.includes(permission);

// Reducer
export const authSliceReducer = authSlice.reducer;
