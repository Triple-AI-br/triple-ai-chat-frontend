import { Space, Tooltip, Typography } from "antd";
import { CardStyled, TitleContainer } from "./styled";
import { IContract } from "../../../services";
import { useNavigate } from "react-router-dom";
import { routesManager } from "../../../routes/routesManager";
import {
  DeleteOutlined,
  EditOutlined,
  MessageOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";

type ContractCardProps = {
  contract: IContract;
  setContractToEdit: React.Dispatch<React.SetStateAction<IContract | undefined>>;
  fetchContracts: () => Promise<void>;
  handleDeleteContract: (contract: IContract) => void;
};

const ContractCard: React.FC<ContractCardProps> = ({
  contract,
  setContractToEdit,
  handleDeleteContract,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <CardStyled
      onClick={() => navigate(routesManager.getContractAnalysisRoute(contract.id))}
      title={
        <TitleContainer>
          <Tooltip title={contract.title}>
            <Typography.Paragraph ellipsis={{ rows: 1 }} style={{ width: "100%" }}>
              {contract.title}
            </Typography.Paragraph>
          </Tooltip>
        </TitleContainer>
      }
      actions={[
        <Tooltip title={t("global.edit")} key="edit" placement="bottom">
          <EditOutlined
            onClick={(e) => {
              e.stopPropagation();
              setContractToEdit(contract);
            }}
          />
        </Tooltip>,
        <Tooltip title={t("global.delete")} key="delete" placement="bottom">
          <DeleteOutlined
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteContract(contract);
            }}
          />
        </Tooltip>,
      ]}
      type="inner"
    >
      <Space direction="vertical">
        <Space direction="horizontal">
          <MessageOutlined />
          <Typography.Text>{`${t("pages.contracts.components.card.totalAnalysis")}: ${
            contract.risk_analysis.length
          }`}</Typography.Text>
        </Space>
        <Space direction="horizontal">
          <QuestionCircleOutlined />
          <Typography.Text>{`${t("pages.contracts.components.card.totalQuestions")}: ${
            contract.questions.length
          }`}</Typography.Text>
        </Space>
      </Space>
    </CardStyled>
  );
};

export { ContractCard };
