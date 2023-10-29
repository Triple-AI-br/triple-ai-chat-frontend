import {
  FlagOutlined,
  LoadingOutlined,
  MessageOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Button, Collapse, CollapseProps, Menu, MenuProps, Space, Tooltip, Typography } from "antd";
import { useEffect, useRef, useState } from "react";
import { MenuContainer, ToolContent } from "./styled";
import Search from "antd/es/input/Search";
import { AnalysisList, QuestionList } from "../../../pages/ContractAnalysis";
import Paragraph from "antd/es/typography/Paragraph";
import ReactMarkdown from "react-markdown";
import { useTranslation } from "react-i18next";

type ContractToolProps = {
  analysis: AnalysisList[];
  loadingAnalysis: boolean;

  questions: QuestionList[];
  loadingQuestion: boolean;
  selectedText?: string;
  appendBotAskReponse: (e: string) => void;

  ref2: React.RefObject<HTMLDivElement>;
};

const ContractTool: React.FC<ContractToolProps> = ({
  analysis,
  loadingAnalysis,
  questions,
  loadingQuestion,
  selectedText,
  ref2,
  appendBotAskReponse,
}) => {
  const { t } = useTranslation();
  const bottomRef = useRef<HTMLDivElement>(null);

  const [current, setCurrent] = useState("analysis");
  const [selectedAnalysis, setSelectedAnalysis] = useState("1");

  const analysisItems: CollapseProps["items"] = analysis.map((item, index) => {
    return {
      key: index,
      label: (
        <Paragraph
          ellipsis={{
            rows: 2,
            expandable: false,
            suffix: item.selected.split(" ").reverse().slice(0, 3).reverse().join(" "),
          }}
        >
          {item.selected}
        </Paragraph>
      ),
      children: (
        <Space direction="vertical" style={{ width: "100%" }}>
          <Typography.Text type="secondary" italic>{`"${item.selected}"`}</Typography.Text>
          <Typography.Text>
            {" "}
            <ReactMarkdown>{item.response}</ReactMarkdown>
          </Typography.Text>
        </Space>
      ),
      extra: index === analysis.length - 1 && loadingAnalysis ? <LoadingOutlined /> : null,
    };
  });

  const items: MenuProps["items"] = [
    {
      label: t("pages.contractAnalysis.actions.riskAnalysis"),
      key: "analysis",
      icon: <MessageOutlined />,
    },
    {
      label: t("pages.contractAnalysis.actions.askAI"),
      key: "questions",
      icon: <QuestionCircleOutlined />,
    },
    {
      label: t("pages.contractAnalysis.actions.flags"),
      key: "flags",
      disabled: true,
      icon: <FlagOutlined />,
    },
  ];

  const renderContent = () => {
    switch (current) {
      case "analysis":
        return (
          <Space direction="vertical">
            <Tooltip
              title={
                !selectedText ? t("pages.contractAnalysis.components.warning.selectASection") : null
              }
            >
              <Button
                type="primary"
                loading={loadingAnalysis}
                icon={<PlusOutlined />}
                disabled={loadingAnalysis || !selectedText}
              >
                {t("pages.contractAnalysis.components.menuTool.genRiskAnalysisBtn")}
              </Button>
            </Tooltip>
            {analysisItems.length ? (
              <Collapse
                accordion
                items={analysisItems}
                onChange={(key) => setSelectedAnalysis(key as string)}
                activeKey={selectedAnalysis}
              />
            ) : null}
          </Space>
        );
      case "questions":
        return (
          <>
            <Search
              size="large"
              autoFocus={true}
              disabled={!selectedText}
              placeholder={
                selectedText
                  ? t("pages.contractAnalysis.components.menuTool.askSomethingPlaceholder")
                  : t("pages.contractAnalysis.components.warning.selectASection")
              }
              onSearch={appendBotAskReponse}
              allowClear
              enterButton
              style={{ marginBottom: "40px" }}
            />
            <Space direction="vertical" style={{ width: "100%" }}>
              {!!questions.length &&
                questions.map((question, index) => {
                  return (
                    <Collapse
                      key={index}
                      defaultActiveKey={index === questions.length - 1 ? "1" : undefined}
                      items={[
                        {
                          key: "1",
                          label: question.question,
                          children: (
                            <>
                              <Space direction="vertical">
                                <Typography.Text italic type="secondary">
                                  {`"${question.selected}"`}
                                </Typography.Text>
                                <Typography.Text>
                                  <ReactMarkdown>{question.response}</ReactMarkdown>
                                </Typography.Text>
                              </Space>
                            </>
                          ),
                          extra:
                            index === questions.length - 1 && loadingQuestion ? (
                              <LoadingOutlined />
                            ) : null,
                        },
                      ]}
                    />
                  );
                })}
            </Space>
          </>
        );
      default:
        return;
    }
  };

  // Scrolls to bottom every time loadingAnalysis is modified
  useEffect(() => {
    setCurrent("questions");
    bottomRef.current?.scrollIntoView({ behavior: "smooth", inline: "end" });
  }, [loadingQuestion]);

  // Scrolls to bottom every time loadingAnalysis is modified
  useEffect(() => {
    setCurrent("analysis");
    bottomRef.current?.scrollIntoView({ behavior: "smooth", inline: "end" });
    if (loadingAnalysis) {
      setSelectedAnalysis((prev) =>
        analysisItems.length ? String(analysisItems.length - 1) : prev,
      );
    }
  }, [loadingAnalysis]);

  return (
    <MenuContainer ref={ref2}>
      <Menu
        onClick={(e) => setCurrent(e.key)}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
      <ToolContent>
        {renderContent()}
        <div ref={bottomRef}></div>
      </ToolContent>
    </MenuContainer>
  );
};

export { ContractTool };
