import { api } from "./api";

type IContractHTML = {
  html_content: string;
};

const convertContractToHTML = async (contractInfo: FormData): Promise<IContractHTML> => {
  const url = "/contracts/convert-docx-to-html";
  const response = await api.post(url, contractInfo, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const contractsServices = { convertContractToHTML };
