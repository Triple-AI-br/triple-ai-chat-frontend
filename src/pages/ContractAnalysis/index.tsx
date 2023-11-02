import {
  Button,
  Dropdown,
  FloatButton,
  MenuProps,
  Skeleton,
  Space,
  Tooltip,
  Tour,
  TourProps,
  Typography,
  message,
} from "antd";
import { Base } from "../../layouts/Base";
import { AnalysisContainer, ContractContainer, Page, SelectedTextContainer } from "./styled";
import { v4 as uuidv4 } from "uuid";
import {
  CopyOutlined,
  FlagOutlined,
  MessageOutlined,
  QuestionCircleOutlined,
  TagOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { ContractTool } from "../../components/Contracts/ContractTool";
import Search from "antd/es/input/Search";
import { IContract, contractsServices } from "../../services";
import Paragraph from "antd/es/typography/Paragraph";
import { actionDisplayNotification } from "../../redux/notificationSlice";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { routesManager } from "../../routes/routesManager";
import { useWindowSize } from "../../utils/useWindowSize";
import { MenuContainer } from "../../components/Contracts/ContractTool/styled";

const DESKTOP_WIDTH = 1000;

const ContractAnalysisPage = () => {
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

  const handleMouseUp = () => {
    const selected = window.getSelection()?.toString();
    setAskSomething(false);
    setSelectedText(selected || "");
  };

  const items: MenuProps["items"] = [
    {
      label: askSomething ? (
        <Search
          autoFocus
          placeholder={t("pages.contractAnalysis.components.menuTool.askSomethingPlaceholder")}
          onSearch={appendBotAskReponse}
          allowClear
          enterButton
        />
      ) : null,
      key: "0",
    },
    {
      label: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Button
            onClick={() => appendBotAnalysisResponse()}
            icon={<MessageOutlined />}
            disabled={loadingResponse}
          >
            {t("pages.contractAnalysis.actions.riskAnalysis")}
          </Button>
          <Button
            icon={<QuestionCircleOutlined />}
            disabled={loadingResponse}
            onClick={() => setAskSomething((prev) => !prev)}
          >
            {t("pages.contractAnalysis.actions.askAI")}
          </Button>
          <Button
            icon={<CopyOutlined />}
            onClick={() => {
              navigator.clipboard.writeText(selectedText || "");
              message.success(t("pages.contractAnalysis.components.warning.copiedToClipboard"));
            }}
          >
            {t("pages.contractAnalysis.actions.copy")}
          </Button>
        </div>
      ),
      key: "1",
    },
    {
      label: (
        <Button icon={<FlagOutlined />} disabled>
          {t("pages.contractAnalysis.actions.flags")}
        </Button>
      ),
      key: "2",
      disabled: true,
    },
  ];

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

  useEffect(() => {
    setContractToState();
  }, []);

  useEffect(() => {
    if (!contract || loading) return;
    const container = document.querySelector("#contract_container") as HTMLElement;
    if (contract.html_content && container) {
      container.innerHTML = contract.html_content;
    }
    // Ao primeiro render do contrato não será feita alterações.
    if (!firstRender.current) {
      firstRender.current = true;
      return;
    }
    const contractUpdates: Partial<Omit<IContract, "id">> = {
      risk_analysis: contract.risk_analysis,
      questions: contract.questions,
    };
    contractsServices.updateContract(contract.id, contractUpdates);
  }, [contract]);

  if (loading || !contract) {
    return (
      <Base title="Contract Analysis">
        <AnalysisContainer>
          <ContractContainer>
            <Space direction="vertical" style={{ width: "100%", gap: 0, marginBottom: "30px" }}>
              <Skeleton
                active
                loading={!isDesktop}
                paragraph={{ rows: 2, width: ["30%", "40%"] }}
              />
              <Skeleton active paragraph={{ rows: 1, width: ["70%"] }} />
            </Space>
            <Page>
              <Skeleton active paragraph={{ rows: 25 }} />
            </Page>
          </ContractContainer>
          <MenuContainer>
            <Space direction="vertical" style={{ width: "100%", gap: 0, marginBottom: "30px" }}>
              <Skeleton active loading={isDesktop} paragraph={{ rows: 1, width: ["70%"] }} />
            </Space>
            <Space
              direction="horizontal"
              style={{ width: "100%", overflow: "hidden", marginBottom: "30px" }}
            >
              <Skeleton.Input active size="large" />
              <Skeleton.Input active size="large" />
              <Skeleton.Input active size="large" />
            </Space>
            <Skeleton.Button active size="large" block />
            <Space direction="vertical" style={{ width: "100%", margin: "30px 0" }}>
              <Skeleton active paragraph={{ rows: 5 }} />
            </Space>
          </MenuContainer>
        </AnalysisContainer>
      </Base>
    );
  }

  return (
    <Base title="Contract Analysis">
      <FloatButton.BackTop shape="square" />
      {isDesktop && !loading ? (
        <Tour
          open={openTutorial}
          onClose={() => {
            setOpenTutorial(false);
            localStorage.setItem("contract_tutorial", "checked");
          }}
          scrollIntoViewOptions={{ block: "start", behavior: "smooth" }}
          steps={steps}
          indicatorsRender={(current, total) => (
            <span>
              {current + 1} / {total}
            </span>
          )}
        />
      ) : null}
      <AnalysisContainer>
        <ContractContainer>
          {!isDesktop ? (
            <Space direction="vertical" style={{ width: "100%", gap: 0 }}>
              <Paragraph
                ellipsis={{ rows: 1, expandable: false }}
                style={{ fontSize: "16px", fontWeight: 600, lineHeight: "", margin: 0 }}
              >
                {contract?.title}
              </Paragraph>
              <Typography.Text>
                <TagOutlined style={{ marginRight: "5px" }} />
                {contract?.contract_type}
              </Typography.Text>
              <Typography.Text type="secondary">
                <UserOutlined style={{ marginRight: "5px" }} />
                {contract?.represented_party}
              </Typography.Text>
            </Space>
          ) : null}
          <SelectedTextContainer>
            <Typography.Title
              level={5}
              style={{ position: "sticky", top: 0, width: "100%", backgroundColor: "#fff" }}
            >
              <Tooltip title={t("pages.contractAnalysis.tooltip")}>
                <QuestionCircleOutlined style={{ marginRight: "10px", cursor: "pointer" }} />
              </Tooltip>
              {t("pages.contractAnalysis.selectedSection")}
            </Typography.Title>
            {selectedText ? (
              <Paragraph
                type="secondary"
                ellipsis={{
                  rows: 1,
                  expandable: false,
                  suffix:
                    selectedText.split(" ").length > 15
                      ? selectedText.split(" ").slice(-3).join(" ")
                      : undefined,
                }}
              >
                {selectedText}
              </Paragraph>
            ) : (
              <Paragraph italic>
                {t("pages.contractAnalysis.components.warning.selectASection")}
              </Paragraph>
            )}
          </SelectedTextContainer>
          <Page ref={ref1}>
            <Dropdown
              menu={{ items }}
              trigger={["contextMenu"]}
              open={!!selectedText && (askSomething || undefined)}
              autoFocus
              align={{}}
            >
              <div
                id="contract_container"
                onMouseUp={handleMouseUp}
                onFocus={() => setSelectedText("")}
                onDoubleClick={handleMouseUp}
                style={{ display: "relative" }}
              ></div>
            </Dropdown>
          </Page>
        </ContractContainer>
        <ContractTool
          ref2={ref2}
          selectedText={selectedText}
          loadingAnalysis={loadingAnalysis}
          loadingQuestion={loadingQuestion}
          contract={contract}
          appendBotAskReponse={appendBotAskReponse}
          appendBotRiskAnalysis={appendBotAnalysisResponse}
          handleDeleteAnalysis={handleDeleteAnalysis}
          handleDeleteQuestion={handleDeleteQuestion}
        />
      </AnalysisContainer>
    </Base>
  );
};

export { ContractAnalysisPage };
