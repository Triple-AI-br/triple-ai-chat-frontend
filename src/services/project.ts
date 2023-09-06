import { api } from "./api";

export interface IProject {
    id: number;
    title: string;
    description: string;
    customer: { id: number; name: string };
}

const getProject = async (id: string | number): Promise<IProject> => {
  const url = `/projects/${id}`;
  const response = await api.get(url);
  return response.data;
};

const listProjects = async (): Promise<IProject[]> => {
  const url = "/projects";
  const response = await api.get(url);
  return response.data;
};

export const projectService = {
  getProject,
  listProjects,
};
