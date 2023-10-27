import { Button, Dropdown, MenuProps, message } from "antd";
import { Base } from "../../layouts/Base";
import { AnalysisContainer, ContractContainer } from "./styled";
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

type AnalysisList = {
  selected: string;
  response: string;
};

const ContractAnalysis: React.FC = () => {
  const contract = useAppSelector(selectContract);
  const [selectedText, setSelectedText] = useState<string>();
  const [analysis, setAnalysis] = useState<AnalysisList[]>([]);
  const [loadingAnalysis, setLoadingAnalysis] = useState<boolean>(false);

  const appendBotResponse = () => {
    if (!selectedText) return;
    setLoadingAnalysis(true);
    setTimeout(() => {
      setAnalysis((prev) => [...prev, { selected: selectedText, response: "Lorem Ipsum" }]);
    }, 3000);
    setLoadingAnalysis(false);
  };

  const handleMouseUp = () => {
    const selected = window.getSelection()?.toString();
    if (!selected) return;
    setSelectedText(selected);
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Button icon={<QuestionCircleOutlined />}>Ask</Button>
          <Button
            icon={<CopyOutlined />}
            onClick={() => {
              navigator.clipboard.writeText(selectedText || "");
              message.success("Copied to clipboard");
            }}
          >
            Copy
          </Button>
          <Button onClick={() => appendBotResponse()} icon={<MessageOutlined />}>
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
      <AnalysisContainer>
        <ContractContainer>
          <Dropdown menu={{ items }} trigger={["contextMenu"]} overlayStyle={{ maxWidth: "320px" }}>
            <div
              id="contract_container"
              onMouseUp={handleMouseUp}
              onDoubleClick={handleMouseUp}
              style={{ display: "relative" }}
            ></div>
          </Dropdown>
        </ContractContainer>
        <ContractTool analysis={analysis} loadingAnalysis={loadingAnalysis} />
      </AnalysisContainer>
    </Base>
  );
};

export { ContractAnalysis };
