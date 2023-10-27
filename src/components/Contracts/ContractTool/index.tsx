import { FlagOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Collapse, CollapseProps, Menu, MenuProps, Typography } from "antd";
import { useState } from "react";
import { MenuContainer, ToolContent } from "./styled";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";

type ContractToolProps = {
  analysis: {
    selected: string;
    response: string;
  }[];
  loadingAnalysis: boolean;
};

const ContractTool: React.FC<ContractToolProps> = ({ analysis, loadingAnalysis }) => {
  const [current, setCurrent] = useState("analysis");

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
      icon: <AutoAwesomeOutlinedIcon />,
      style: { transition: "ease-in-out 2s" },
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
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <MenuContainer>
      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
      <ToolContent>
        {current === "analysis" ? (
          <Collapse accordion items={analysisItems} defaultActiveKey={["1"]} />
        ) : null}
        {/* TODO: Colocar animação de carregar nova analise */}
        {loadingAnalysis ? "Loading..." : null}
      </ToolContent>
    </MenuContainer>
  );
};

export { ContractTool };
