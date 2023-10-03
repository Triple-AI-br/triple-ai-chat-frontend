import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import axios from "axios";
import { api } from "../services/api";
import { usersService } from "../services/users";

const ACCESS_TOKEN_KEY = "jwt";
const BASE_API_URL = process.env.REACT_APP_BASE_API_URL as string;

interface IUserData {
  id: number;
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
  isAuthenticated?: boolean;
  error?: string;
  userData?: IUserData | null;
  customerData?: ICustomerData | null;
}

const getAccessTokenFromLocalStorage = () => localStorage.getItem(ACCESS_TOKEN_KEY);

const setAccessTokenToLocalStorage = (accessToken: string, remember?: boolean) => {
  if (remember) {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  } else {
    sessionStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  }
};

const _initialAccessToken = getAccessTokenFromLocalStorage() || "";

const initialState: IState = {
  status: "idle",
  accessToken: _initialAccessToken,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      localStorage.removeItem(ACCESS_TOKEN_KEY);
    },
    updateUserAndCustomer(
      state,
      action: PayloadAction<{ customer: ICustomerData; user: IUserData }>,
    ) {
      state.customerData = action.payload.customer;
      state.userData = action.payload.user;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(actionLogin.pending, (state) => {
        state.status = "loading";
        state.error = undefined;
      })
      .addCase(actionLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        const {
          authData: { access_token: accessToken },
          userData,
          customerData,
          remember,
        } = action.payload;
        setAccessTokenToLocalStorage(accessToken, remember);
        state.accessToken = accessToken;
        state.isAuthenticated = true;
        state.userData = userData;
        state.customerData = customerData;
      })
      .addCase(actionLogin.rejected, (state) => {
        state.error = "Failed to authenticate user";
      })
      .addCase(actionSwitchCustomer.pending, (state) => {
        state.status = "loading";
        state.error = undefined;
      })
      .addCase(actionSwitchCustomer.fulfilled, (state, action) => {
        state.status = "succeeded";
        const {
          authData: { access_token: accessToken },
          userData,
          customerData,
        } = action.payload;
        state.accessToken = accessToken;
        state.isAuthenticated = true;
        state.userData = userData;
        state.customerData = customerData;
        setAccessTokenToLocalStorage(accessToken);
      })
      .addCase(actionSwitchCustomer.rejected, (state) => {
        state.error = "Failed to switch customers";
      })
      .addCase(actionAcceptInviteOrResetPassword.pending, (state) => {
        state.status = "loading";
        state.error = undefined;
      })
      .addCase(actionAcceptInviteOrResetPassword.fulfilled, (state, action) => {
        state.status = "succeeded";
        const {
          authData: { access_token: accessToken },
          userData,
          customerData,
        } = action.payload;
        state.accessToken = accessToken;
        state.isAuthenticated = true;
        state.userData = userData;
        state.customerData = customerData;
        setAccessTokenToLocalStorage(accessToken);
      })
      .addCase(actionAcceptInviteOrResetPassword.rejected, (state) => {
        state.error = "Failed to authenticate user";
      })
      .addCase(actionUpdateAuthenticationStatus.pending, (state) => {
        state.status = "loading";
        state.error = undefined;
      })
      .addCase(actionUpdateAuthenticationStatus.fulfilled, (state, action) => {
        const { customer, user } = action.payload;
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.userData = user;
        state.customerData = customer;
      })
      .addCase(actionUpdateAuthenticationStatus.rejected, (state) => {
        state.status = "failed";
        state.isAuthenticated = false;
        state.userData = null;
        state.customerData = null;
      });
  },
});

// Actions
export const { logout: actionLogout, updateUserAndCustomer: actionUpdateUserAndCustomer } =
  authSlice.actions;

export const actionUpdateAuthenticationStatus = createAsyncThunk("auth/refresh", async () => {
  const data = await usersService.getMe();
  return data;
});

export const actionLogin = createAsyncThunk(
  "auth/login",
  async ({
    email,
    password,
    remember,
  }: {
    email: string;
    password: string;
    remember?: boolean;
  }) => {
    const url = `${BASE_API_URL}/api/v1/login/access-token`;
    const formdata = new FormData();
    formdata.append("username", email);
    formdata.append("password", password);
    const authResponse = await axios.post(url, formdata);
    const authData: IIncomingTokenCredentials = authResponse.data;
    const { customer, user } = await usersService.getMe(authData.access_token);
    return { authData, customerData: customer, userData: user, remember };
  },
);

export const actionSwitchCustomer = createAsyncThunk(
  "auth/switchCustomer",
  async (customer_id: number) => {
    const url = "/users/superuser-switch-customer";
    const response = await api.post(url, { customer_id });
    const authData: IIncomingTokenCredentials = response.data;
    const { customer, user } = await usersService.getMe(authData.access_token);
    return { authData, customerData: customer, userData: user };
  },
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
    userData: IUserData;
  }> => {
    if (password !== confirmPassword) {
      throw Error("Passwords don't match");
    }
    const url =
      type === "invite"
        ? `${BASE_API_URL}/api/v1/login/invited-set-password`
        : `${BASE_API_URL}/api/v1/login/reset-password`;
    const authResponse = await axios.post(url, { token, password });
    const authData: IIncomingTokenCredentials = authResponse.data;
    const { customer, user } = await usersService.getMe(authData.access_token);
    return { authData, customerData: customer, userData: user };
  },
);

// Selectors
export const selectUserData = (state: RootState) => state.auth.userData;
export const selectCustomerId = (state: RootState) => state.auth.userData?.customer_id;
export const selectCustomerData = (state: RootState) => state.auth.customerData;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectError = (state: RootState) => state.auth.error;
export const selectIsAdmin = (state: RootState) => state.auth.userData?.is_admin;
export const selectIsSuperUser = (state: RootState) => state.auth.userData?.is_superuser;
export const selectIsAdminOrSuperUser = (state: RootState) =>
  state.auth.userData?.is_admin || state.auth.userData?.is_superuser;

// Reducer
export const authSliceReducer = authSlice.reducer;
