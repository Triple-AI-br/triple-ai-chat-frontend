import { api } from "./api";

export interface ISearchResult {
  file_name: string;
  page: number;
  text: string;
  score: number;
}

const searchSnippets = async ({
  projectId,
  q,
  limit,
}: {
  projectId: number | string;
  q: string;
  limit: number;
}): Promise<ISearchResult[]> => {
  const url = `/projects/${projectId}/search`;
  const response = await api.get(url, { params: { q, limit } });
  const data: ISearchResult[] = response.data;
  return data;
};

export const searchService = {
  searchSnippets,
};
