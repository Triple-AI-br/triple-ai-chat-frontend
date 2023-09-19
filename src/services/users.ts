import axios from "axios";
import { ICustomerData } from "../redux/authenticationSlice";
import { api } from "./api";

export type PermissionsArray = Array<"files:upload" | "files:delete">;

export interface IUserDataResponse {
  id: number;
  email: string;
  is_superuser: boolean;
  is_admin: boolean;
  permissions: PermissionsArray;
}

export interface IUserMe {
  user: IUserDataResponse;
  customer: ICustomerData;
}

const getMe = async (token?: string): Promise<IUserMe> => {
  const url = "/users/me";
  let data;
  if (token) {
    const BASE_API_URL = process.env.REACT_APP_BASE_API_URL as string;
    const completeUrl = `${BASE_API_URL}/api/v1` + url;
    const response = await axios.get(completeUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });
    data = response.data;
  } else {
    const response = await api.get(url);
    data = response.data;
  }
  return data;
};

const listUsers = async (): Promise<IUserDataResponse[]> => {
  const url = "/users";
  const response = await api.get(url);
  return response.data;
};

export const usersService = {
  getMe,
  listUsers,
};
