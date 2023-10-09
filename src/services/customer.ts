import { ICustomerData } from "../redux/authenticationSlice";
import { api } from "./api";

export type CreateCustomerParams = {
  name: string;
  main_color: string;
  logo_url: string;
  is_active: boolean;
  limit_queries_per_month: number;
  limit_number_of_projects: number;
  limit_size_in_gb: number;
  limit_number_of_users: number;
  renewal_day: number;
};

const getCustomer = async (id: string | number): Promise<ICustomerData> => {
  const url = `/customers/${id}`;
  const res = await api.get(url);
  return res.data;
};

const getAllCustomers = async (): Promise<ICustomerData[]> => {
  const url = "/customers";
  const res = await api.get(url);
  return res.data;
};

const createCustomer = async (payload: CreateCustomerParams): Promise<ICustomerData> => {
  const url = "/customers";
  const res = await api.post(url, payload);
  return res.data;
};

const deleteCustomer = async (id: number): Promise<ICustomerData> => {
  const url = `/customers/${id}`;
  const res = await api.delete(url);
  return res.data;
};

const updateCustomer = async (
  payload: CreateCustomerParams,
  id: number,
): Promise<ICustomerData> => {
  const url = `/customers/${id}`;
  const res = await api.patch(url, payload);
  return res.data;
};

export const customerService = {
  getCustomer,
  getAllCustomers,
  createCustomer,
  deleteCustomer,
  updateCustomer,
};
