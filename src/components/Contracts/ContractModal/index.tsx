import { InboxOutlined } from "@ant-design/icons";
import { Button, Form, FormInstance, Modal, Select, UploadProps, message } from "antd";
import Dragger from "antd/es/upload/Dragger";
import { useNavigate } from "react-router-dom";
import { routesManager } from "../../../routes/routesManager";
import { useAppDispatch } from "../../../redux/hooks";
import { useTranslation } from "react-i18next";
import { useRef, useState } from "react";
import { IContract, contractsServices } from "../../../services";
import { contractCategories, represent } from "./constansts";
import { actionDisplayNotification } from "../../../redux/notificationSlice";
import { useConvertFile } from "../../../utils/useConvertFile";
import { RcFile } from "antd/es/upload";

type ContractModal = {
  open: boolean;
  handleCancel: () => void;
  handleSubmit?: () => void;
  contractToEdit?: IContract;
  fetchContracts: () => Promise<void>;
};

type FieldType = {
  contract_category: string[];
  represent_part: string[];
};

const ContractModal: React.FC<ContractModal> = ({
  open,
  handleCancel,
  contractToEdit,
  fetchContracts,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { docxToHtml } = useConvertFile();
  const { t } = useTranslation();
  const form = useRef<FormInstance>(null);
  const [file, setFile] = useState<RcFile>();
  const [loadingForm, setLoadingForm] = useState<boolean>(false);

  // 5MB
  const maxFileSize = 5_000_000;

  const isEditing = !!contractToEdit;

  const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const props: UploadProps = {
    name: "file",
    beforeUpload(file) {
      return new Promise((resolve, reject) => {
        if (file.size > maxFileSize) {
          reject("File size exceeded");
          message.error("File size exceeded");
        } else {
          resolve("sucess");
        }
      });
    },
    customRequest({ file, onSuccess, onError }) {
      try {
        const uploadedFile = file as RcFile;
        setFile(uploadedFile);
        if (onSuccess) onSuccess("sucess");
      } catch (error) {
        if (onError) onError(error as ProgressEvent<EventTarget>);
      }
    },
  };

  const handleClose = () => {
    form.current?.resetFields();
    if (handleCancel) {
      handleCancel();
    }
  };

  const handleSubmit = async (formValues: FieldType) => {
    if (!file && !isEditing) return;
    try {
      setLoadingForm(true);
      if (isEditing) {
        const newContractInfo = {
          contract_type: formValues.contract_category[0],
          represented_party: formValues.represent_part[0],
        };

        await contractsServices.updateContract(contractToEdit.id, newContractInfo);
        dispatch(
          actionDisplayNotification({
            severity: "success",
            messages: [t("global.successUpdateMessage")],
          }),
        );
      } else if (file) {
        const html: string = await docxToHtml({ file: file as Blob });

        const contractForm = {
          title: file.name,
          contract_type: formValues.contract_category[0],
          represented_party: formValues.represent_part[0],
          html_content: html,
        };

        const createdContract = await contractsServices.postContract(contractForm);
        const { id } = createdContract;
        navigate(routesManager.getContractAnalysisRoute(id));
      }
    } catch (er) {
      if (isEditing) {
        dispatch(
          actionDisplayNotification({
            severity: "warning",
            messages: [t("global.failureUpdateMessage")],
          }),
        );
      } else {
        dispatch(
          actionDisplayNotification({
            severity: "warning",
            messages: [t("global.failureUploadMessage")],
          }),
        );
      }
    } finally {
      setLoadingForm(false);
      handleClose();
      fetchContracts();
    }
  };

  return (
    <Modal
      title={isEditing ? t("pages.contracts.editContract") : t("pages.contracts.newContract")}
      open={open}
      onCancel={handleClose}
      destroyOnClose={true}
      afterClose={handleClose}
      footer={[
        <Button loading={loadingForm} key="cancel" onClick={() => handleClose()}>
          {t("global.cancel")}
        </Button>,
        <Button
          loading={loadingForm}
          form="contract_form"
          key="submit"
          htmlType="submit"
          type="primary"
        >
          {t("global.submit")}
        </Button>,
      ]}
    >
      <Form
        id="contract_form"
        ref={form}
        preserve={false}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={
          isEditing
            ? {
                contract_category: [contractToEdit.contract_type],
                represent_part: [contractToEdit.represented_party],
              }
            : {}
        }
        onValuesChange={(values) => {
          if (form.current) {
            if (values.contract_category?.length) {
              form.current.setFieldValue("contract_category", [values.contract_category.pop()]);
            }
            if (values.represent_part?.length) {
              form.current.setFieldValue("represent_part", [values.represent_part.pop()]);
            }
          }
        }}
      >
        <Form.Item
          name="contract_file"
          valuePropName="fileList"
          getValueFromEvent={(event) => event?.fileList}
          rules={
            isEditing
              ? undefined
              : [
                  {
                    required: true,
                    message: t("pages.contracts.components.warning.pleaseUploadContract"),
                  },
                  {
                    validator(_, fileList) {
                      return new Promise((resolve, reject) => {
                        // Limitação de tamanho do contrato em bytes (5MB)
                        if (fileList && fileList.length && fileList[0].size > maxFileSize) {
                          reject(
                            t("pages.contracts.components.warning.sizeExceeded", {
                              size: maxFileSize / 1_000_000,
                            }),
                          );
                        } else if (
                          fileList &&
                          fileList.length &&
                          !fileList[0].type.includes("wordprocessingml")
                        ) {
                          reject(t("pages.contracts.components.warning.mustBeFormat"));
                        } else {
                          resolve("sucess");
                        }
                      });
                    },
                  },
                ]
          }
        >
          <Dragger
            defaultFileList={
              isEditing
                ? [
                    {
                      name: contractToEdit.title,
                      uid: String(contractToEdit.id),
                      status: "done",
                      response: { status: "success" },
                    },
                  ]
                : []
            }
            disabled={isEditing}
            multiple={false}
            maxCount={1}
            {...props}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">{t("pages.contracts.components.upload.label")}</p>
            <p className="ant-upload-hint">{t("pages.contracts.components.upload.placeholder")}</p>
          </Dragger>
        </Form.Item>
        <Form.Item
          name="contract_category"
          label={t("pages.contracts.components.contractCategory.label")}
          rules={[
            {
              required: true,
              message: t("pages.contracts.components.warning.pleaseSelectCategory"),
            },
          ]}
        >
          <Select
            mode="tags"
            loading={loadingForm}
            options={contractCategories}
            onSelect={() => (document.activeElement as HTMLElement).blur()}
            showSearch
            placeholder={t("pages.contracts.components.contractCategory.placeholder")}
            optionFilterProp="children"
            filterOption={filterOption}
            allowClear
          />
        </Form.Item>
        <Form.Item
          name="represent_part"
          label={t("pages.contracts.components.representPart.label")}
          rules={[
            {
              required: true,
              message: t("pages.contracts.components.warning.pleaseSelectPartYouRepresent"),
            },
          ]}
        >
          <Select
            mode="tags"
            filterOption={filterOption}
            loading={loadingForm}
            onSelect={() => (document.activeElement as HTMLElement).blur()}
            showSearch
            optionFilterProp="children"
            allowClear
            options={represent}
            placeholder={t("pages.contracts.components.representPart.placeholder")}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export { ContractModal };
