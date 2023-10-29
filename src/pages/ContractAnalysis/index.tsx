import {
  Button,
  Dropdown,
  FloatButton,
  MenuProps,
  Tooltip,
  Tour,
  TourProps,
  Typography,
  message,
} from "antd";
import { Base } from "../../layouts/Base";
import { AnalysisContainer, ContractContainer, Page, SelectedTextContainer } from "./styled";
import {
  CopyOutlined,
  FlagOutlined,
  MessageOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectContract } from "../../redux/contractSlice";
import { ContractTool } from "../../components/Contracts/ContractTool";
import Search from "antd/es/input/Search";
import { chatService } from "../../services";
import Paragraph from "antd/es/typography/Paragraph";
import { actionDisplayNotification } from "../../redux/notificationSlice";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { routesManager } from "../../routes/routesManager";
import { useWindowSize } from "../../utils/useWindowSize";

export type AnalysisList = {
  selected: string;
  response: string;
};

export type QuestionList = {
  selected: string;
  question: string;
  response: string;
};
const DESKTOP_WIDTH = 1000;

const ContractAnalysis: React.FC = () => {
  const contract = useAppSelector(selectContract);
  const dispatch = useAppDispatch();
  const { width } = useWindowSize();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);

  const [openTutorial, setOpenTutorial] = useState<boolean>(
    !localStorage.getItem("contract_tutorial"),
  );
  const [selectedText, setSelectedText] = useState<string>();
  // analysis state
  const [analysis, setAnalysis] = useState<AnalysisList[]>([]);
  const [loadingAnalysis, setLoadingAnalysis] = useState<boolean>(false);
  // Ask state
  const [askSomething, setAskSomething] = useState<boolean>(false);
  const [questions, setQuestions] = useState<QuestionList[]>([]);
  const [loadingQuestion, setLoadingQuestion] = useState<boolean>(false);

  const isDesktop = width >= DESKTOP_WIDTH;
  const loadingResponse = loadingAnalysis || loadingQuestion;

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
    if (!selectedText) return;
    setAnalysis((prev) => [...prev, { selected: selectedText, response: "|" }]);
    try {
      const analysisPrompt = `Você é advogado que defende os interesses da ${
        contract.representPart
      }. Analise o trecho abaixo extraído de um contrato${
        contract.category !== "none" ? ` ${contract.category}` : null
      }, identifique possíveis riscos${
        contract.representPart !== "none" ? ` para a parte ${contract.representPart}` : null
      } e, caso a redação precisar ser modificada, faça essa sugestão e aponte qual a nova redação. Só sugira alterações se for estritamente necessário. Responda com o mínimo de palavras possível!\n\n${selectedText}`;
      await chatService.sendMessageStream({
        prompt: analysisPrompt,
        callback(data) {
          setLoadingAnalysis(true);
          setAnalysis((prev) => {
            const lastAnalysis = prev[prev.length - 1];
            if (data.finish_reason) {
              lastAnalysis["response"] = lastAnalysis.response.slice(0, -1);
              setLoadingAnalysis(false);
              return [...prev];
            } else {
              lastAnalysis["response"] = lastAnalysis.response.slice(0, -1) + data.delta + "|";
              return [...prev];
            }
          });
        },
      });
    } catch (err) {
      setAnalysis((prev) => prev.slice(0, -1));
      dispatch(
        actionDisplayNotification({
          messages: [(err as { message: string }).message],
        }),
      );
    }
  };

  const appendBotAskReponse = async (e: string) => {
    if (!selectedText || !e) return;
    setLoadingQuestion(true);
    setQuestions((prev) => [...prev, { selected: selectedText, question: e, response: "|" }]);
    try {
      const questionPrompt = `Você é advogado${
        contract.representPart !== "none"
          ? ` que defende os interesses da parte ${contract.representPart}`
          : null
      }. Analise o trecho abaixo extraído de um contrato${
        contract.category !== "none" ? ` ${contract.category}` : null
      } e responda a pergunta em seguida do trecho. Só sugira alterações se for estritamente necessário.\n\n${selectedText}. \n\n${e}`;
      await chatService.sendMessageStream({
        prompt: questionPrompt,
        callback(data) {
          setLoadingQuestion(true);
          setQuestions((prev) => {
            const lastQuestion = prev[prev.length - 1];
            if (data.finish_reason) {
              lastQuestion.response = lastQuestion.response.slice(0, -1);
              setLoadingQuestion(false);
              return [...prev];
            } else {
              lastQuestion.response = lastQuestion.response.slice(0, -1) + data.delta + "|";
              return [...prev];
            }
          });
        },
      });
    } catch (err) {
      setQuestions((prev) => prev.slice(0, -1));
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
          autoFocus={askSomething}
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

  useEffect(() => {
    const container = document.querySelector("#contract_container") as HTMLElement;
    if (contract.htmlContent) {
      container.innerHTML = contract.htmlContent;
    } else {
      navigate(routesManager.getContractsRoute());
    }
  }, [contract]);

  return (
    <Base title="Contract Analysis">
      <FloatButton.BackTop shape="square" />
      {isDesktop ? (
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
                  suffix: selectedText.split(" ").reverse().slice(0, 3).reverse().join(" "),
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
            >
              <div
                id="contract_container"
                onMouseUp={handleMouseUp}
                onDoubleClick={handleMouseUp}
                style={{ display: "relative" }}
              ></div>
            </Dropdown>
          </Page>
        </ContractContainer>
        <ContractTool
          ref2={ref2}
          analysis={analysis}
          selectedText={selectedText}
          loadingAnalysis={loadingAnalysis}
          loadingQuestion={loadingQuestion}
          questions={questions}
          appendBotAskReponse={appendBotAskReponse}
          appendBotRiskAnalysis={appendBotAnalysisResponse}
        />
      </AnalysisContainer>
    </Base>
  );
};

export { ContractAnalysis };
