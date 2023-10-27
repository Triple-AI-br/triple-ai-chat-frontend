import { Button, Dropdown, MenuProps } from "antd";
import { Base } from "../../layouts/Base";
import { ContractContainer } from "./styled";
import {
  CopyOutlined,
  FlagOutlined,
  MessageOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";

const ContractAnalysis: React.FC = () => {
  const [selectedText, setSelectedText] = useState<string>();

  const handleMouseUp = () => {
    const selected = window.getSelection()?.toString();
    if (!selected) return;
    const wordsCount = selected?.split(" ");
    setSelectedText(wordsCount.slice(0, 1_000).join(" "));
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
            onClick={() => navigator.clipboard.writeText(selectedText || "")}
          >
            Copy
          </Button>
          <Button onClick={alert} icon={<MessageOutlined />}>
            Analysis
          </Button>
        </div>
      ),
      key: "2",
    },
    {
      label: (
        <Button icon={<FlagOutlined />} disabled>
          Flags (Coming son)
        </Button>
      ),
      key: "3",
      disabled: true,
    },
  ];

  useEffect(() => {
    console.log(selectedText);
  }, [selectedText]);

  return (
    <Base title="Contract Analysis">
      <div>
        <ContractContainer>
          <Dropdown menu={{ items }} trigger={["contextMenu"]} overlayStyle={{ maxWidth: "320px" }}>
            <div
              onMouseUp={handleMouseUp}
              onDoubleClick={handleMouseUp}
              style={{ display: "relative" }}
            >
              <h1>title</h1>
              <br />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore porro quis
                voluptate, iste at aut maxime dolorem ipsam quibusdam labore architecto eligendi quo
                mollitia fugit recusandae minus eos ea temporibus.
              </p>
              <br />

              <ul>
                <li>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum repudiandae sit
                  porro velit nulla quibusdam omnis quas facilis possimus corrupti! Dignissimos
                  error voluptatibus aliquid amet corrupti, porro ipsum placeat dolorum.
                </li>
                <li>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo itaque provident
                  magnam deleniti praesentium nisi, a laborum esse sed, ducimus ipsum assumenda
                  blanditiis quam alias, suscipit sint perspiciatis nam officiis?
                </li>
              </ul>
              <br />

              <span>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium itaque quos
                quidem excepturi maxime eveniet rem ipsum! Ipsa nisi maiores ab, corrupti architecto
                rem suscipit officiis accusamus atque qui. Natus.
              </span>
            </div>
          </Dropdown>
        </ContractContainer>
        <div className="right_content"></div>
      </div>
    </Base>
  );
};

export { ContractAnalysis };
