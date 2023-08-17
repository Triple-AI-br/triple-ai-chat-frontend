import { ICustomerData } from "../redux/authenticationSlice";
import { api } from "./api";

const getCustomer = async (id: string): Promise<ICustomerData> => {
    const url = `/customers/${id}`;
    const res = await api.get(url);
    return res.data;
};

const getAllCustomers = async (): Promise<ICustomerData[]> => {
    const url = "/customers";
    const res = await api.get(url);
    return res.data;
};

export const customerService = { getCustomer, getAllCustomers };
