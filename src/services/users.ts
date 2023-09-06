import { ICustomerData } from "../redux/authenticationSlice";
import { api } from "./api";

export interface IUserDataResponse {
  id: number;
  email: string;
  is_superuser: boolean;
  is_admin: boolean;
  permissions: string[];
}

export interface IUserMe {
  user: IUserDataResponse;
  customer: ICustomerData;
}

const getMe = async (): Promise<IUserMe> => {
  const url = "/users/me";
  const response = await api.get(url);
  const data = response.data;
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
