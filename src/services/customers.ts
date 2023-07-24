import { api } from "./api";

export interface ICustomer {
    id: number;
    name: string;
    main_color: string;
    logo_url: string;
}

const getCustomer = async (customerId: number): Promise<ICustomer> => {
    const url = `/customers/${customerId}`;
    const res = await api.get(url);
    return res.data;
};

export const customersService = { getCustomer };
