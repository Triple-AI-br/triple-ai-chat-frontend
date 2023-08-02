import { api } from "./api";

export interface IProject {
    customer_id: number;
    description: string;
    id: number;
    customer_name?: string;
}

const listProjects = async (): Promise<IProject[]> => {
    const url = "/projects";
    const response = await api.get(url);
    return response.data;
};

export const projectService = {
    listProjects,
};
