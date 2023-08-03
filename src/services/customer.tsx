import { api } from "./api";

interface ICustomer {
    name: string;
}

const getCustomer = async (id: string): Promise<ICustomer> => {
    const url = `/customers/${id}`;
    const res = await api.get(url);
    return res.data;
};

export const customerService = { getCustomer };
