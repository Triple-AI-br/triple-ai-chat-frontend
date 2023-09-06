import { api } from "./api";

export interface IPrompt {
    title: string;
    prompt: string;
    is_public: boolean;
    id: number;
    user_has_liked: boolean;
    user: {
        email: string;
    };
    created_at: string;
    like_count: number;
}

export interface IPromptCreate {
    title: string;
    prompt: string;
    is_public: boolean;
}

const getLiked = async (): Promise<IPrompt[]> => {
  const url = "/prompts/liked/";
  const response = await api.get(url);
  return response.data;
};

const getTop = async (): Promise<IPrompt[]> => {
  const url = "/prompts/top/";
  const response = await api.get(url);
  return response.data;
};

const getLatest = async (): Promise<IPrompt[]> => {
  const url = "/prompts/latest/";
  const response = await api.get(url);
  return response.data;
};

const getOwn = async (): Promise<IPrompt[]> => {
  const url = "/prompts/";
  const response = await api.get(url);
  return response.data;
};

const like = async (id: number): Promise<IPrompt> => {
  const url = `/prompts/${id}/like/`;
  const response = await api.post(url);
  return response.data;
};

const unlike = async (id: number): Promise<IPrompt> => {
  const url = `/prompts/${id}/unlike/`;
  const response = await api.post(url);
  return response.data;
};

const remove = async (id: number) => {
  const url = `/prompts/${id}/`;
  const response = await api.delete(url);
  return response.data;
};

const create = async (prompt: IPromptCreate): Promise<IPrompt> => {
  const url = "/prompts/";
  const response = await api.post(url, prompt);
  return response.data;
};

export const promptsService = {
  remove,
  getLiked,
  getTop,
  getLatest,
  getOwn,
  like,
  unlike,
  create,
};
