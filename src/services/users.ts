import { api } from "./api";

export interface IUserDataResponse {
    id: number;
    email: string;
    is_superuser: boolean;
    is_admin: boolean;
    permissions: string[];
}

const listUsers = async (): Promise<IUserDataResponse[]> => {
	const url = "/users";
	const response = await api.get(url);
	return response.data;
};

export const usersService = {
	listUsers,
};
