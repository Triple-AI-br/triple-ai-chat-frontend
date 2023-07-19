import { api } from "./api";

interface ISitemapSettings {
    data_refresh: boolean;
    executive_js: boolean;
    sitemap_path: string;
    data_refresh_frequency: string;
}

interface ISitemap {
    id: number;
    created_at: string;
    updated_at: string;
    type: string;
    settings: ISitemapSettings;
}

interface IFile {
    id: number;
    page_url: string;
    page_url_hash: string;
    created_at: string;
    updated_at: string;
    crawl_status: string;
    index_status: string;
    is_file: true;
    is_file_kept: number;
    s3_path: string;
    filename: string;
    filesize: number;
}

interface ISourcesResponse {
    data: ISources;
}

export interface ISources {
    sitemaps: ISitemap[];
    uploads: {
        id: number;
        created_at: string;
        updated_at: string;
        type: string;
        pages: IFile[];
    };
}

const listSources = async ({
    projectId,
}: {
    projectId: number;
}): Promise<ISources> => {
    const url = `/projects/${projectId}/sources`;
    const response = await api.get(url);
    const data: ISourcesResponse = response.data;
    return data.data;
};

const deleteSource = async ({
    projectId,
    sourceId,
}: {
    projectId: number | string;
    sourceId: number;
}): Promise<{ success: boolean }> => {
    const url = `/projects/${projectId}/sources/${sourceId}`;
    const response = await api.delete(url);
    const data = response.data;
    return data;
};

export const sourcesService = { listSources, deleteSource };
