import { Button, Dropdown, FloatButton, MenuProps, Tooltip, Typography, message } from "antd";
import { Base } from "../../layouts/Base";
import { AnalysisContainer, ContractContainer, Page, SelectedTextContainer } from "./styled";
import {
  CopyOutlined,
  FlagOutlined,
  MessageOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { selectContract } from "../../redux/contractSlice";
import { ContractTool } from "../../components/Contracts/ContractTool";
import Search from "antd/es/input/Search";

export type AnalysisList = {
  selected: string;
  response: string;
};

export type QuestionList = {
  selected: string;
  question: string;
  response: string;
};

const ContractAnalysis: React.FC = () => {
  const contract = useAppSelector(selectContract);
  const [selectedText, setSelectedText] = useState<string>();
  // analysis state
  const [analysis, setAnalysis] = useState<AnalysisList[]>([]);
  const [loadingAnalysis, setLoadingAnalysis] = useState<boolean>(false);
  // Ask state
  const [askSomething, setAskSomething] = useState<boolean>(false);
  const [questions, setQuestions] = useState<QuestionList[]>([]);
  const [loadingQuestion, setLoadingQuestion] = useState<boolean>(false);

  const loadingResponse = loadingAnalysis || loadingQuestion;

  const appendBotAnalysisResponse = () => {
    if (!selectedText) return;
    setLoadingAnalysis(true);
    setTimeout(() => {
      setAnalysis((prev) => [...prev, { selected: selectedText, response: "Lorem Ipsum" }]);
      setLoadingAnalysis(false);
    }, 3000);
  };

  const appendBotAskReponse = (e: string) => {
    if (!selectedText) return;
    setLoadingQuestion(true);
    setTimeout(() => {
      setQuestions((prev) => [
        ...prev,
        {
          question: e,
          selected: selectedText,
          response: "Lorem Ipsum Requirements",
        },
      ]);
      setLoadingQuestion(false);

      setAskSomething(false);
    }, 3000);
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
          placeholder="Ask something to AI..."
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
            justifyContent: "space-between",
            gap: "10px",
          }}
        >
          <Button
            icon={<QuestionCircleOutlined />}
            disabled={loadingResponse}
            onClick={() => setAskSomething((prev) => !prev)}
          >
            Ask
          </Button>
          <Button
            icon={<CopyOutlined />}
            onClick={() => {
              navigator.clipboard.writeText(selectedText || "");
              message.success("Copied to clipboard");
            }}
          >
            Copy
          </Button>
          <Button
            onClick={() => appendBotAnalysisResponse()}
            icon={<MessageOutlined />}
            disabled={loadingResponse}
          >
            Analysis
          </Button>
        </div>
      ),
      key: "1",
    },
    {
      label: (
        <Button icon={<FlagOutlined />} disabled>
          Flags (Coming soon)
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
      container.innerHTML = "Please select a contract";
    }
  }, [contract]);

  return (
    <Base title="Contract Analysis">
      <FloatButton.BackTop />
      <AnalysisContainer>
        <ContractContainer>
          <SelectedTextContainer>
            <Typography.Title
              level={5}
              style={{ position: "sticky", top: 0, width: "100%", backgroundColor: "#fff" }}
            >
              <Tooltip title="Analysis and answers will be made based on the selected text">
                <QuestionCircleOutlined style={{ marginRight: "10px", cursor: "pointer" }} />
              </Tooltip>
              Selected text:
            </Typography.Title>
            {selectedText ? (
              <Typography.Text ellipsis type="secondary">
                {selectedText}
              </Typography.Text>
            ) : (
              <Typography.Text italic>Select a text thats wants to analisys</Typography.Text>
            )}
          </SelectedTextContainer>
          <Page>
            <Dropdown
              menu={{ items }}
              trigger={["contextMenu"]}
              overlayStyle={{ maxWidth: "340px" }}
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
          analysis={analysis}
          selectedText={selectedText}
          loadingAnalysis={loadingAnalysis}
          loadingQuestion={loadingQuestion}
          questions={questions}
          appendBotAskReponse={appendBotAskReponse}
        />
      </AnalysisContainer>
    </Base>
  );
};

export { ContractAnalysis };
