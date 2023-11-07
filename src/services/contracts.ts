import { fetchEventSource } from "@microsoft/fetch-event-source";
import { api } from "./api";
import { IMessageStream } from "./chat";
import { getAccessTokenFromStorage } from "../utils/getTokenFromStorage";

export type AnalysisList = {
  id: string;
  selected: string;
  response: string;
};

export type QuestionList = {
  id: string;
  selected: string;
  question: string;
  response: string;
};

export type IContract = {
  id: number;
  represented_party: string;
  contract_type: string;
  title: string;
  user_id: string;
  html_content: string;
  risk_analysis: AnalysisList[];
  questions: QuestionList[];
  customer_id: string;
};

type PostContractProps = {
  title: string;
  contract_type: string;
  represented_party: string;
  html_content: string;
};

const postContract = async (contractInfo: PostContractProps): Promise<IContract> => {
  const url = "/contracts";
  const response = await api.post(url, contractInfo);
  return response.data;
};

const getContract = async (contractId: number | string): Promise<IContract> => {
  const url = `/contracts/${contractId}`;
  const response = await api.get(url);
  return response.data;
};

const listContracts = async (limit: number, offset: number): Promise<IContract[]> => {
  const url = `/contracts?limit=${limit}&offset=${offset}`;
  const response = await api.get(url);
  return response.data;
};

const deleteContract = async (contractId: number): Promise<null> => {
  const url = `/contracts/${contractId}`;
  const response = await api.delete(url);
  return response.data;
};

const updateContract = async (
  contractId: number,
  contractUpdate: Partial<Omit<IContract, "id">>,
): Promise<IContract> => {
  const url = `/contracts/${contractId}`;
  const response = await api.patch(url, contractUpdate);
  return response.data;
};

const sendMessageStreamContract = ({
  prompt,
  callback,
}: {
  prompt: string;
  callback(_: IMessageStream): void;
  sessionId?: number;
  projectId?: number;
}): Promise<void> => {
  const accessToken = getAccessTokenFromStorage();
  const url = `${api.defaults.baseURL}/contracts/query/stream`;
  // View package documentation: https://www.npmjs.com/package/@microsoft/fetch-event-source
  return new Promise<void>((resolve, reject) => {
    const ctrl = new AbortController();
    fetchEventSource(url, {
      openWhenHidden: true, // Needed to keep the connection alive when the user switches tabs
      signal: ctrl.signal,
      async onopen(response) {
        if (response.ok) {
          return; // everything's good
        } else {
          const data = await response.json();
          const errMsg = data.detail || "Unknown error";
          reject(new Error(errMsg));
          ctrl.abort();
        }
      },
      onclose() {
        resolve();
      },
      onmessage(msg) {
        if (!msg.data) {
          return;
        }
        const data: IMessageStream = JSON.parse(msg.data);
        callback(data);
      },
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json", // This is required for the server to parse the body
      },
      body: JSON.stringify({
        prompt,
      }),
    });
  });
};

export const contractsServices = {
  postContract,
  getContract,
  listContracts,
  deleteContract,
  updateContract,
  sendMessageStreamContract,
};
