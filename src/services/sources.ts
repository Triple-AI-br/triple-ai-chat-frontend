import axios from "axios";
import { api } from "./api";

interface IS3SignedResponse {
  url: string;
  fields: {
    key: string;
    "x-amz-algorithm": string;
    "x-amz-credential": string;
    "x-amz-date": string;
    policy: string;
    "x-amz-signature": string;
  };
}
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

export interface ISource {
  id: number | string;
  project_id: number;
  file_name: string;
  file_path: string;
  etag?: string;
  media_type: string;
}

const listSources = async ({ projectId }: { projectId: number }): Promise<ISource[]> => {
  const url = `/projects/${projectId}/sources`;
  const response = await api.get(url);
  return response.data;
};

const _uploadToS3 = async ({ file, signedPost }: { file: File; signedPost: IS3SignedResponse }) => {
  const formData = new FormData();
  Object.entries(signedPost.fields).forEach(([key, value]) => formData.append(key, value));
  formData.append("file", file);
  const response = await axios.post(signedPost.url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

const _getUploadUrls = async ({
  files,
  projectId,
}: {
  projectId: string;
  files: string[];
}): Promise<IS3SignedResponse[]> => {
  const url = `/projects/${projectId}/sources/upload-url`;
  const response = await api.get(url, {
    params: { files },

    paramsSerializer: (params) => {
      return Object.keys(params)
        .map(
          (key) =>
            `${key}=${params[key]
              .map((value: string) => encodeURIComponent(value))
              .join(`&${key}=`)}`,
        )
        .join("&");
    },
  });
  return response.data;
};

const uploadSources = async ({
  projectId,
  files,
}: {
  files: File[];
  projectId: number | string;
}): Promise<string[]> => {
  const allowedExtensions = ["csv", "pdf", "pptx", "docx", "txt"];
  files.forEach((file) => {
    const extension = file.name.split(".").pop() as string;
    if (!allowedExtensions.includes(extension.toLowerCase())) {
      throw new Error(
        `Invalid file type: ${extension}. Allowed types are ${allowedExtensions.join(", ")}`,
      );
    }
  });

  const signedPosts = await _getUploadUrls({
    projectId: projectId.toString(),
    files: files.map((file) => file.name),
  });
  const uploads = files.map((file, index) =>
    _uploadToS3({
      file,
      signedPost: signedPosts[index],
    }),
  );
  await Promise.all(uploads);
  return signedPosts.map((signedPost) => signedPost.fields.key);
};

const deleteSource = async ({
  projectId,
  sourcePath,
}: {
  projectId: number | string;
  sourcePath: string;
}): Promise<{ success: boolean }> => {
  const url = `/projects/${projectId}/sources`;
  const response = await api.delete(url, {
    data: { file_path: sourcePath },
  });
  const data = response.data;
  return data;
};

const getUploadUrl = async ({
  projectId,
  sourceId,
}: {
  projectId: number;
  sourceId: number;
}): Promise<Blob> => {
  const url = `/projects/${projectId}/sources/${sourceId}`;
  const response = await api.get(url, { responseType: "blob" });
  return response.data;
};

const getSourceSignedUrl = async ({
  projectId,
  sourceId,
}: {
  projectId: number;
  sourceId: number | string;
}): Promise<string> => {
  const url = `/projects/${projectId}/sources/${sourceId}/signed-url`;
  const response = await api.get(url);
  return response.data;
};

export const sourcesService = {
  listSources,
  deleteSource,
  uploadSources,
  getSourceSignedUrl,
  getUploadUrl,
};
