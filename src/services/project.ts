import { api } from "./api";

export interface IProject {
  id: number;
  title: string;
  description: string;
  customer: { id: number; name: string };
  is_public: boolean;
  internal_knowledge_only: boolean;
  system_tone: string;
}

export interface CreateProjectParams {
  title: string;
  description: string;
  system_tone: string;
  internal_knowledge_only: boolean;
  is_public: boolean;
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

const createProject = async (project: CreateProjectParams): Promise<IProject> => {
  const url = "/projects";
  const response = await api.post(url, project);
  return response.data;
};

const editProject = async ({
  project,
  project_id,
}: {
  project_id: number | string;
  project: CreateProjectParams;
}): Promise<IProject> => {
  const url = `/projects/${project_id}`;
  const response = await api.patch(url, project);
  return response.data;
};

export const projectService = {
  editProject,
  getProject,
  listProjects,
  createProject,
};
