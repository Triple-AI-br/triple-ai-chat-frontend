/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Modal, Skeleton, Typography } from "antd";
import { Base } from "../../layouts/Base";
import { TabContainer, ContractsContainer } from "./styled";
import { useTranslation } from "react-i18next";
import { ContractModal } from "../../components/Contracts/ContractModal";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { IContract, contractsServices } from "../../services";
import { ContractCard } from "../../components/Contracts/ContractCard";
import { useAppDispatch } from "../../redux/hooks";
import { actionDisplayNotification } from "../../redux/notificationSlice";

const ContractPage: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [openContractModal, setOpenContractModal] = useState(false);
  const [contracts, setContracts] = useState<IContract[]>();
  const [contractToEdit, setContractToEdit] = useState<IContract>();
  const [loading, setLoading] = useState(true);

  const setContractListToState = async () => {
    try {
      setLoading(true);
      const fetchContracts = await contractsServices.listContracts(30, 0);
      setContracts(fetchContracts);
    } catch (err) {
      dispatch(
        actionDisplayNotification({
          severity: "warning",
          messages: [t("global.failureRequestMessage")],
        }),
      );
    } finally {
      setLoading(false);
    }
  };

  const warning = (contract: IContract) => {
    Modal.confirm({
      title: t("global.confirm"),
      content: t("pages.contracts.components.warning.areYouSureToDeleteContract", {
        contract_name: contract.title,
      }),
      onOk: async () => {
        try {
          await contractsServices.deleteContract(contract.id);
          setContractListToState();
          dispatch(
            actionDisplayNotification({
              severity: "success",
              messages: [t("global.successDeletedMessage")],
            }),
          );
        } catch {
          dispatch(
            actionDisplayNotification({
              severity: "warning",
              messages: [t("global.failureDeleteMessage")],
            }),
          );
        }
      },
      cancelText: t("global.cancel"),
      okText: t("global.delete"),
    });
  };

  useEffect(() => {
    setContractListToState();
  }, []);

  if (loading) {
    return (
      <Base title={t("pages.contracts.title")}>
        <>
          <TabContainer>
            <Skeleton.Button active size="large" style={{ width: "200px" }} />
          </TabContainer>
          <ContractsContainer>
            {Array.from(Array(10)).map((_, index) => (
              <Card key={index} loading={true} />
            ))}
          </ContractsContainer>
        </>
      </Base>
    );
  }

  return (
    <Base title={t("pages.contracts.title")}>
      <ContractModal
        open={openContractModal || !!contractToEdit}
        handleCancel={() => {
          setOpenContractModal(false);
          setContractToEdit(undefined);
        }}
        fetchContracts={setContractListToState}
        contractToEdit={contractToEdit}
      />
      <>
        <TabContainer>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setOpenContractModal((prev) => !prev)}
          >
            {t("pages.contracts.newContract")}
          </Button>
        </TabContainer>
        {!contracts?.length ? (
          <Typography.Text>
            {t("pages.contracts.components.warning.youDontHaveContract")}
          </Typography.Text>
        ) : null}
        <ContractsContainer>
          {contracts?.length
            ? contracts.map((contract) => (
                <ContractCard
                  key={contract.id}
                  handleDeleteContract={(contractInfo) => warning(contractInfo)}
                  fetchContracts={setContractListToState}
                  contract={contract}
                  setContractToEdit={setContractToEdit}
                ></ContractCard>
              ))
            : null}
        </ContractsContainer>
      </>
    </Base>
  );
};

export { ContractPage };
