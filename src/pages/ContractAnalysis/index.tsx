import { Button, Dropdown, MenuProps, message } from "antd";
import { Base } from "../../layouts/Base";
import { ContractContainer } from "./styled";
import {
  CopyOutlined,
  FlagOutlined,
  MessageOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { selectContract } from "../../redux/contractSlice";

const ContractAnalysis: React.FC = () => {
  const contract = useAppSelector(selectContract);
  const [selectedText, setSelectedText] = useState<string>();

  function highlightRange(range: Range | null) {
    if (!range) return;
    const newNode = document.createElement("span");
    newNode.setAttribute("style", "background-color: yellow; display: inline;");
    newNode.appendChild(range.extractContents());
    range.insertNode(newNode);
  }

  const appendBotResponse = (selection: Selection | null) => {
    if (!selection) return;
    const range = selection.getRangeAt(0);
    highlightRange(range);
    range.createContextualFragment("asijdioajdiajsd");
  };

  const handleMouseUp = () => {
    const selected = window.getSelection()?.toString();
    if (!selected) return;
    setSelectedText(selected);
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <div
          style={{
            display: "block",
            width: "100%",
            overflowX: "hidden",
            overflowY: "auto",
            maxHeight: "100px",
          }}
        >
          <p style={{}}>{window.getSelection()?.toString()}</p>
        </div>
      ),
      key: "1",
    },
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
          <Button
            onClick={() => appendBotResponse(window.getSelection())}
            icon={<MessageOutlined />}
          >
            Analysis
          </Button>
        </div>
      ),
      key: "2",
    },
    {
      label: (
        <Button icon={<FlagOutlined />} disabled>
          Flags (Coming soon)
        </Button>
      ),
      key: "3",
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
      <div>
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
        <div className="right_content"></div>
      </div>
    </Base>
  );
};

export { ContractAnalysis };
