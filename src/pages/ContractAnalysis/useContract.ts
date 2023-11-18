import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../redux/hooks";
import { useWindowSize } from "../../utils/useWindowSize";
import { useNavigate, useParams } from "react-router-dom";
import { useRef, useState } from "react";
import { IContract, contractsServices } from "../../services";
import { TourProps } from "antd";
import { v4 as uuidv4 } from "uuid";
import { actionDisplayNotification } from "../../redux/notificationSlice";
import { routesManager } from "../../routes/routesManager";
import { Export2Word } from "../../utils/exportToWord";

const DESKTOP_WIDTH = 1000;

const useContract = () => {
  const dispatch = useAppDispatch();
  const { width } = useWindowSize();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const firstRender = useRef(false);

  const [contract, setContract] = useState<IContract>();
  const [loading, setLoading] = useState<boolean>(true);
  const [openTutorial, setOpenTutorial] = useState<boolean>(
    !localStorage.getItem("contract_tutorial"),
  );
  const [selectedText, setSelectedText] = useState<string>();
  // analysis state
  const [loadingAnalysis, setLoadingAnalysis] = useState<boolean>(false);
  // Ask state
  const [askSomething, setAskSomething] = useState<boolean>(false);
  const [loadingQuestion, setLoadingQuestion] = useState<boolean>(false);

  // edit document state
  const [editingDocument, setEditingDocument] = useState<boolean>(false);
  const [text, setText] = useState(contract?.html_content);

  const isDesktop = width >= DESKTOP_WIDTH;
  const loadingResponse = loadingAnalysis || loadingQuestion;

  const analysisPrompt = `Você é advogado que defende os interesses da parte: ${contract?.represented_party}. Analise o trecho abaixo extraído de um contrato de: ${contract?.contract_type}.Identifique possíveis riscos para a parte: ${contract?.represented_party}. Caso a redação precisar ser modificada, faça essa sugestão e aponte qual a nova redação. Só sugira alterações se for estritamente necessário. Responda com o mínimo de palavras possível!\n\n${selectedText}`;

  const steps: TourProps["steps"] = [
    {
      title: t("pages.contractAnalysis.components.tutorial.firstStep.title"),
      description: t("pages.contractAnalysis.components.tutorial.firstStep.description"),
      placement: "right",
      target: () => ref1.current!,
      nextButtonProps: {
        children: t("pages.contractAnalysis.components.tutorial.nextBtn"),
      },
    },
    {
      title: t("pages.contractAnalysis.components.tutorial.secondStep.title"),
      description: t("pages.contractAnalysis.components.tutorial.secondStep.description"),
      placement: "left",
      target: () => ref2.current!,
      prevButtonProps: {
        children: t("pages.contractAnalysis.components.tutorial.previousBtn"),
      },
      nextButtonProps: {
        children: t("pages.contractAnalysis.components.tutorial.nextBtn"),
      },
    },
  ];

  const appendBotAnalysisResponse = async () => {
    if (!selectedText || !contract) return;
    setContract((prev) => {
      if (!prev) return;
      return {
        ...prev,
        risk_analysis: [
          ...prev.risk_analysis,
          { selected: selectedText, response: "|", id: uuidv4() },
        ],
      };
    });
    try {
      await contractsServices.sendMessageStreamContract({
        prompt: analysisPrompt,
        callback(data) {
          setLoadingAnalysis(true);
          setContract((prev) => {
            if (!prev) return;
            const lastAnalysis = prev.risk_analysis[prev.risk_analysis.length - 1];
            if (data.finish_reason) {
              lastAnalysis["response"] = lastAnalysis.response.slice(0, -1);
              setLoadingAnalysis(false);
              return { ...prev, risk_analysis: [...(prev.risk_analysis || [])] };
            } else {
              lastAnalysis["response"] = lastAnalysis.response.slice(0, -1) + data.delta + "|";
              return { ...prev, risk_analysis: [...(prev.risk_analysis || [])] };
            }
          });
        },
      });
    } catch (err) {
      setContract((prev) => {
        if (!prev) return;
        return {
          ...prev,
          risk_analysis: prev.risk_analysis.slice(0, -1),
        };
      });
      dispatch(
        actionDisplayNotification({
          messages: [(err as { message: string }).message],
        }),
      );
    }
  };

  const appendBotAskReponse = async (e: string) => {
    if (!selectedText || !e || !contract) return;
    setLoadingQuestion(true);
    setAskSomething(false);
    setContract((prev) => {
      if (!prev) return;
      return {
        ...prev,
        questions: [
          ...prev.questions,
          { selected: selectedText, question: e, response: "|", id: uuidv4() },
        ],
      };
    });
    try {
      const questionPrompt = `Você é advogado que defende os interesses da parte: ${contract?.represented_party}. Considerando o trecho abaixo, delimitado por ---, extraído de um contrato de: ${contract?.contract_type}, responda a pergunta delimitada por ###:
      \n\n###${e}###
      \n\n---${selectedText}---`;

      await contractsServices.sendMessageStreamContract({
        prompt: questionPrompt,
        callback(data) {
          setLoadingQuestion(true);
          setContract((prev) => {
            if (!prev) return;
            const lastQuestion = prev.questions[prev.questions.length - 1];
            if (data.finish_reason) {
              lastQuestion.response = lastQuestion.response.slice(0, -1);
              setLoadingQuestion(false);
              return { ...prev, questions: [...(prev.questions || [])] };
            } else {
              lastQuestion.response = lastQuestion.response.slice(0, -1) + data.delta + "|";
              return { ...prev, questions: [...(prev.questions || [])] };
            }
          });
        },
      });
    } catch (err) {
      setContract((prev) => {
        if (!prev) return;
        return {
          ...prev,
          risk_analysis: prev.questions.slice(0, -1),
        };
      });
      dispatch(
        actionDisplayNotification({
          messages: [(err as { message: string }).message],
        }),
      );
    } finally {
      setAskSomething(false);
    }
  };

  const handleDownloadContract = () => {
    try {
      if (!contract) return;
      Export2Word("contract_container", contract.title);
    } catch (err) {
      dispatch(
        actionDisplayNotification({
          messages: [t("global.failureRequestMessage")],
        }),
      );
    }
  };

  const handleMouseUp = () => {
    const selected = window.getSelection()?.toString();
    setAskSomething(false);
    setSelectedText(selected || "");
  };

  const handleDeleteAnalysis = (id: string) => {
    setContract((prev) => {
      if (!prev) return;
      return {
        ...prev,
        risk_analysis: prev.risk_analysis.filter((item) => item.id !== id),
      };
    });
  };

  const handleDeleteQuestion = (id: string) => {
    setContract((prev) => {
      if (!prev) return;
      return {
        ...prev,
        questions: prev.questions.filter((item) => item.id !== id),
      };
    });
  };

  const setContractToState = async () => {
    try {
      setLoading(true);
      if (!id) {
        navigate(routesManager.getContractsRoute());
        return;
      }
      const fetchContract = await contractsServices.getContract(id);
      setContract(fetchContract);
    } catch (er) {
      dispatch(
        actionDisplayNotification({
          severity: "warning",
          messages: [t("global.failureRequestMessage")],
        }),
      );
    } finally {
      setLoading(false);
    }
  };

  const updateContractHtml = async () => {
    try {
      if (!text || !contract) return;
      await contractsServices.updateContract(contract.id, { html_content: text });
    } catch (er) {
      dispatch(
        actionDisplayNotification({
          severity: "warning",
          messages: [t("global.failureUpdateMessage")],
        }),
      );
    } finally {
      setContractToState();
    }
  };

  return {
    contract,
    text,
    ref1,
    ref2,
    loadingAnalysis,
    loadingQuestion,
    setSelectedText,
    selectedText,
    updateContractHtml,
    handleDeleteQuestion,
    handleDeleteAnalysis,
    handleMouseUp,
    appendBotAskReponse,
    appendBotAnalysisResponse,
    setAskSomething,
    editingDocument,
    setEditingDocument,
    askSomething,
    setText,
    steps,
    isDesktop,
    loadingResponse,
    openTutorial,
    setOpenTutorial,
    loading,
    firstRender,
    setContractToState,
    handleDownloadContract,
  };
};

export { useContract };
