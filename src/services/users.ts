import axios from "axios";
import { ICustomerData } from "../redux/authenticationSlice";
import { api } from "./api";

export type PermissionsArray = Array<"files:upload" | "files:delete">;

export interface IUserListResponse {
  users: IUserData[];
  total: number;
}

export interface IUserData {
  id: number;
  email: string;
  is_superuser: boolean;
  is_admin: boolean;
  permissions: PermissionsArray;
}

export interface IUserMe {
  user: IUserData;
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

const listUsers = async (
  skip: number,
  limit: number,
  search?: string,
): Promise<IUserListResponse> => {
  const url = `/users?skip=${skip}&limit=${limit}${search ? `&search=${search}` : ""}`;
  const response = await api.get(url);
  return response.data;
};

export const usersService = {
  getMe,
  listUsers,
};
