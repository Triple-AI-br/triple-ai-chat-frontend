/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Tooltip, Typography } from "antd";
import { Base } from "../../layouts/Base";
import { TabContainer, ContractsContainer, TitleContainer } from "./styled";
import { useTranslation } from "react-i18next";
import { ContractModal } from "../../components/Contracts/ContractModal";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { IContract, contractsServices } from "../../services";
import { routesManager } from "../../routes/routesManager";
import { useNavigate } from "react-router-dom";

const ContractPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [openContractModal, setOpenContractModal] = useState(false);
  const [contracts, setContracts] = useState<IContract[]>();

  const setContractListToState = async () => {
    const fetchContracts = await contractsServices.listContracts(30, 0);
    setContracts(fetchContracts);
  };

  useEffect(() => {
    setContractListToState();
  }, []);

  return (
    <Base title={t("pages.contracts.title")}>
      <ContractModal open={openContractModal} handleClose={() => setOpenContractModal(false)} />
      <>
        <TabContainer>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setOpenContractModal((prev) => !prev)}
          >
            Novo contrato
          </Button>
        </TabContainer>
        <ContractsContainer>
          {contracts?.length
            ? contracts.map((contract) => (
                <Card
                  key={contract.id}
                  style={{ overflow: "hidden", cursor: "pointer" }}
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
                  type="inner"
                ></Card>
              ))
            : null}
        </ContractsContainer>
      </>
    </Base>
  );
};

export { ContractPage };
