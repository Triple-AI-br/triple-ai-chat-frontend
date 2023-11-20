import {
  Button,
  Dropdown,
  FloatButton,
  MenuProps,
  Skeleton,
  Space,
  Tooltip,
  Tour,
  Typography,
  message,
} from "antd";
import { Base } from "../../layouts/Base";
import { AnalysisContainer, ContractContainer, Page, SelectedTextContainer } from "./styled";
import {
  CopyOutlined,
  DownloadOutlined,
  EditOutlined,
  FlagOutlined,
  MessageOutlined,
  QuestionCircleOutlined,
  TagOutlined,
  UpOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useEffect } from "react";
import { ContractTool } from "../../components/Contracts/ContractTool";
import Search from "antd/es/input/Search";
import { IContract, contractsServices } from "../../services";
import Paragraph from "antd/es/typography/Paragraph";
import { useTranslation } from "react-i18next";
import { MenuContainer } from "../../components/Contracts/ContractTool/styled";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Importe o estilo CSS
import ButtonGroup from "antd/es/button/button-group";
import { useContract } from "./useContract";

export type AnalysisList = {
  id: string;
  selected: string;
  response: string;
};

const ContractAnalysisPage = () => {
  const {
    contract,
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
    openTutorial,
    loadingResponse,
    loadingQuestion,
    setSelectedText,
    setOpenTutorial,
    loading,
    firstRender,
    selectedText,
    ref1,
    ref2,
    loadingAnalysis,
    text,
    setContractToState,
    handleDownloadContract,
  } = useContract();
  const { t } = useTranslation();

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

  // First render
  useEffect(() => {
    setContractToState();
  }, []);

  // Second render / every contract change
  useEffect(() => {
    if (!contract || loading) return;
    const container = document.querySelector("#contract_container") as HTMLElement;
    if (contract.html_content && container) {
      container.innerHTML = contract.html_content;
    }
    setText(contract.html_content);
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

  // On edit contract
  useEffect(() => {
    if (!editingDocument) {
      if (!contract || loading) return;
      const container = document.querySelector("#contract_container") as HTMLElement;
      if (contract.html_content && container) {
        container.innerHTML = contract.html_content;
      }
      setText(contract.html_content);
    }
  }, [editingDocument]);

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
            <Skeleton.Button active />
            <Page>
              <Skeleton active paragraph={{ rows: 25 }} />
            </Page>
          </ContractContainer>
          <MenuContainer>
            <Space direction="vertical" style={{ width: "100%", gap: 0, marginBottom: "30px" }}>
              <Skeleton active loading={isDesktop} paragraph={{ rows: 2, width: ["70%"] }} />
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
      <FloatButton.Group shape="circle" type="primary">
        <FloatButton.BackTop type="primary" icon={<UpOutlined />} />
        <FloatButton type="primary" icon={<DownloadOutlined />} onClick={handleDownloadContract} />
      </FloatButton.Group>
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
          <ButtonGroup>
            {editingDocument ? (
              <>
                <Button
                  onClick={async () => {
                    await updateContractHtml();
                    setEditingDocument(false);
                  }}
                  type="primary"
                >
                  {t("global.save")}
                </Button>
                <Button
                  onClick={() => {
                    setText(contract.html_content);
                    setEditingDocument(false);
                  }}
                >
                  {t("global.cancel")}
                </Button>
              </>
            ) : (
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={() => setEditingDocument(true)}
              >
                {t("global.edit")}
              </Button>
            )}
          </ButtonGroup>
          <Page ref={ref1}>
            {!editingDocument ? (
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
            ) : (
              <ReactQuill theme="snow" value={text} onChange={(value) => setText(value)} />
            )}
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
