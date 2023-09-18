import { api } from "./api";
import { PermissionsArray } from "./users";

export interface IProject {
  id: number;
  title: string;
  description: string;
  customer: { id: number; name: string };
  is_public: boolean;
  internal_knowledge_only: boolean;
  system_tone: string;
  user_owner: {
    email: string;
    id: number;
  };
}

export interface CreateProjectParams {
  title: string;
  description: string;
  system_tone: string;
  internal_knowledge_only: boolean;
  is_public: boolean;
}
export interface IGrantedUsers {
  id: number;
  email: string;
  is_active: boolean;
  is_superuser: boolean;
  is_admin: boolean;
  confirmed_email: boolean;
  permissions: PermissionsArray;
}

export interface inviteUserToProjectParams {
  projectId: string | number;
  emails: string[];
  permissions: PermissionsArray;
}

export interface RequestInvitesReturns {
  failed_to_invite: string[];
}

const getProject = async (id: string | number): Promise<IProject> => {
  const url = `/projects/${id}`;
  const response = await api.get(url);
  return response.data;
  const url = `/projects/${id}`;
  const response = await api.get(url);
  return response.data;
};

const listProjects = async (): Promise<IProject[]> => {
  const url = "/projects";
  const response = await api.get(url);
  return response.data;
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

const getGrantedUsers = async (projectId: number | string): Promise<IGrantedUsers[]> => {
  const url = `/projects/${projectId}/granted-users`;
  const response = await api.get(url);
  return response.data;
};

const inviteManyUserToProject = async (
  data: inviteUserToProjectParams,
): Promise<RequestInvitesReturns> => {
  const url = `/projects/${data.projectId}/invite-users`;
  const response = await api.post(url, data);
  return response.data;
};

const deleteProject = async (projectId: number | string) => {
  const url = `/projects/${projectId}`;
  await api.delete(url);
};

const deleteUserFromProject = async (projectId: number | string, email: string) => {
  const url = `/projects/${projectId}/remove-user`;
  await api.delete(url, { data: { email: email } });
};

export const projectService = {
  editProject,
  getProject,
  listProjects,
  createProject,
  getGrantedUsers,
  inviteManyUserToProject,
  deleteUserFromProject,
  deleteProject,
};
