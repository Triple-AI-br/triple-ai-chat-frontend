import { api } from "./api";

export interface ISearchResult {
  id: string;
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
  try {
    const url = `/projects/${projectId}/search`;
    const response = await api.get(url, { params: { q, limit } });
    const data: ISearchResult[] = response.data.length > 0 ? response.data : [];
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const searchService = {
  searchSnippets,
};
