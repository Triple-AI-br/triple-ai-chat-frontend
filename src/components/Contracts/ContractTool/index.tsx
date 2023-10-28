import { FlagOutlined, MessageOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Collapse, CollapseProps, Menu, MenuProps, Space, Typography } from "antd";
import { useEffect, useRef, useState } from "react";
import { MenuContainer, ToolContent } from "./styled";
import Search from "antd/es/input/Search";
import { AnalysisList, QuestionList } from "../../../pages/ContractAnalysis";

type ContractToolProps = {
  analysis: AnalysisList[];
  loadingAnalysis: boolean;

  questions: QuestionList[];
  loadingQuestion: boolean;
  selectedText?: string;
  appendBotAskReponse: (e: string) => void;
};

const ContractTool: React.FC<ContractToolProps> = ({
  analysis,
  loadingAnalysis,
  questions,
  loadingQuestion,
  selectedText,
  appendBotAskReponse,
}) => {
  const [current, setCurrent] = useState("analysis");

  const bottomRef = useRef<HTMLDivElement>(null);
  const loading = loadingAnalysis || loadingQuestion;

  const analysisItems: CollapseProps["items"] = analysis.map((item, index) => {
    return {
      key: index,
      label: item.selected,
      children: <Typography.Text>{item.response}</Typography.Text>,
    };
  });

  const items: MenuProps["items"] = [
    {
      label: "Analysis",
      key: "analysis",
      icon: <MessageOutlined />,
    },
    {
      label: "Ask",
      key: "ask",
      icon: <QuestionCircleOutlined />,
    },
    {
      label: "Flags (coming soon)",
      key: "SubMenu",
      disabled: true,
      icon: <FlagOutlined />,
    },
  ];

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  const renderContent = () => {
    switch (current) {
      case "analysis":
        if (analysisItems.length) {
          return (
            <Collapse
              accordion
              items={analysisItems}
              defaultActiveKey={[analysisItems.length ? String(analysisItems.length - 1) : "1"]}
            />
          );
        } else {
          return null;
        }
      case "ask":
        return (
          <>
            <Search
              size="large"
              autoFocus={true}
              disabled={!selectedText}
              placeholder="Ask something to AI..."
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
                                <Typography.Text>{question.response}</Typography.Text>
                              </Space>
                            </>
                          ),
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
    setCurrent("analysis");
    bottomRef.current?.scrollIntoView({ behavior: "smooth", inline: "end" });
  }, [loadingAnalysis]);

  // Scrolls to bottom every time loadingAnalysis is modified
  useEffect(() => {
    setCurrent("ask");
    bottomRef.current?.scrollIntoView({ behavior: "smooth", inline: "end" });
  }, [loadingQuestion]);

  return (
    <MenuContainer>
      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
      <ToolContent>
        {renderContent()}
        {/* TODO: Colocar animação de carregar nova analise */}
        <div ref={bottomRef}>{loading ? "Loading..." : null}</div>
      </ToolContent>
    </MenuContainer>
  );
};

export { ContractTool };
