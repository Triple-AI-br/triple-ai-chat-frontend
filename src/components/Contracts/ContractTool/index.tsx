import {
  DeleteOutlined,
  FlagOutlined,
  LoadingOutlined,
  MessageOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  TagOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Button,
  Collapse,
  CollapseProps,
  Menu,
  MenuProps,
  Popconfirm,
  Space,
  Tooltip,
  Typography,
} from "antd";
import { useEffect, useRef, useState } from "react";
import { FileNameContainer, MenuContainer, ToolContent } from "./styled";
import Search from "antd/es/input/Search";
import Paragraph from "antd/es/typography/Paragraph";
import ReactMarkdown from "react-markdown";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../../redux/hooks";
import { actionDisplayNotification } from "../../../redux/notificationSlice";
import { IContract } from "../../../services";

type ContractToolProps = {
  loadingAnalysis: boolean;
  appendBotRiskAnalysis: () => void;
  handleDeleteAnalysis: (id: string) => void;

  loadingQuestion: boolean;
  appendBotAskReponse: (e: string) => void;
  handleDeleteQuestion: (id: string) => void;

  selectedText?: string;
  ref2: React.RefObject<HTMLDivElement>;
  contract: IContract;
};

const ContractTool: React.FC<ContractToolProps> = ({
  loadingAnalysis,
  loadingQuestion,
  selectedText,
  ref2,
  contract,
  appendBotAskReponse,
  appendBotRiskAnalysis,
  handleDeleteAnalysis,
  handleDeleteQuestion,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const bottomRef = useRef<HTMLDivElement>(null);

  const [current, setCurrent] = useState("analysis");
  const [selectedAnalysis, setSelectedAnalysis] = useState("1");

  const analysisItems: CollapseProps["items"] = contract.risk_analysis.map((item, index) => {
    return {
      key: index,
      label: (
        <Paragraph
          ellipsis={{
            rows: 2,
            expandable: false,
            suffix: item.selected.split(" ").slice(-6).join(" "),
          }}
        >
          {item.selected}
        </Paragraph>
      ),
      children: (
        <Space direction="vertical" style={{ width: "100%" }}>
          <Paragraph
            ellipsis={{
              rows: 2,
              expandable: true,
              symbol: "more",
            }}
            type="secondary"
            italic
          >
            {`"${item.selected}"`}{" "}
          </Paragraph>
          <Typography.Text>
            <ReactMarkdown>{item.response}</ReactMarkdown>
          </Typography.Text>
        </Space>
      ),
      extra:
        index === contract.risk_analysis.length - 1 && loadingAnalysis ? (
          <LoadingOutlined />
        ) : (
          <Popconfirm
            title={t("pages.contractAnalysis.components.warning.deleteAnalysis")}
            description={t("pages.contractAnalysis.components.warning.areYouSureToDeleteAnalysis")}
            onConfirm={(e) => {
              e?.stopPropagation();
              handleDeleteAnalysis(item.id);
              dispatch(
                actionDisplayNotification({
                  severity: "success",
                  messages: [t("global.successDeletedMessage")],
                }),
              );
            }}
            onCancel={(e) => e?.stopPropagation()}
            okText={t("global.confirm")}
            cancelText={t("global.cancel")}
          >
            <Button
              onClick={(e) => {
                e.stopPropagation();
              }}
              style={{ border: "none", backgroundColor: "transparent" }}
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        ),
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
                onClick={appendBotRiskAnalysis}
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
              {!!contract.questions.length &&
                contract.questions.map((question, index) => {
                  return (
                    <Collapse
                      key={index}
                      defaultActiveKey={index === contract.questions.length - 1 ? "1" : undefined}
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
                            index === contract.questions.length - 1 && loadingQuestion ? (
                              <LoadingOutlined />
                            ) : (
                              <Popconfirm
                                title={t(
                                  "pages.contractAnalysis.components.warning.deleteQuestion",
                                )}
                                description={t(
                                  "pages.contractAnalysis.components.warning.areYouSureToDeleteQuestion",
                                )}
                                onConfirm={(e) => {
                                  e?.stopPropagation();
                                  handleDeleteQuestion(question.id);
                                  dispatch(
                                    actionDisplayNotification({
                                      severity: "success",
                                      messages: [t("global.successDeletedMessage")],
                                    }),
                                  );
                                }}
                                onCancel={(e) => e?.stopPropagation()}
                                okText={t("global.confirm")}
                                cancelText={t("global.cancel")}
                              >
                                <Button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                  }}
                                  style={{ border: "none", backgroundColor: "transparent" }}
                                  icon={<DeleteOutlined />}
                                />
                              </Popconfirm>
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
      <FileNameContainer>
        <Paragraph
          ellipsis={{ rows: 1, expandable: false }}
          style={{ fontSize: "16px", fontWeight: 600, lineHeight: "", margin: 0, width: "100%" }}
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
      </FileNameContainer>
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
