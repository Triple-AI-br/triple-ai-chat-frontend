import { InboxOutlined } from "@ant-design/icons";
import { Button, Form, FormInstance, Modal, Select, UploadProps, message } from "antd";
import Dragger from "antd/es/upload/Dragger";
import { useNavigate } from "react-router-dom";
import { routesManager } from "../../../routes/routesManager";
import { useAppDispatch } from "../../../redux/hooks";
import { useTranslation } from "react-i18next";
import { useRef, useState } from "react";
import { contractsServices } from "../../../services";
import { RcFile } from "antd/es/upload";
import { contractCategories, represent } from "./constansts";
import { actionDisplayNotification } from "../../../redux/notificationSlice";

type ContractModal = {
  open: boolean;
  handleClose: () => void;
  handleSubmit?: () => void;
};

type FieldType = {
  contract_category: string[];
  represent_part: string[];
};

const ContractModal: React.FC<ContractModal> = ({ open, handleClose }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const form = useRef<FormInstance>(null);
  const [file, setFile] = useState<RcFile>();

  // 5MB
  const maxFileSize = 5_000_000;

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

  const handleSubmit = async (formValues: FieldType) => {
    if (!file) return;
    try {
      const formdata = new FormData();
      formdata.append("file", file, file.name);
      formdata.append(
        "contract",
        JSON.stringify({
          represented_party: formValues.represent_part[0],
          contract_type: formValues.contract_category[0],
        }),
      );
      const createdContract = await contractsServices.postContract(formdata);
      const { id } = createdContract;
      navigate(routesManager.getContractAnalysisRoute(id));
    } catch (er) {
      dispatch(
        actionDisplayNotification({
          severity: "warning",
          messages: [t("global.failureUploadMessage")],
        }),
      );
    }
  };

  return (
    <Modal
      title="New contract"
      open={open}
      footer={[
        <Button key="cancel" onClick={() => handleClose()}>
          {t("global.cancel")}
        </Button>,
        <Button form="contract_form" key="submit" htmlType="submit" type="primary">
          {t("global.submit")}
        </Button>,
      ]}
    >
      <Form
        id="contract_form"
        ref={form}
        layout="vertical"
        onFinish={handleSubmit}
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
          rules={[
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
          ]}
        >
          <Dragger multiple={false} maxCount={1} {...props}>
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
            options={contractCategories}
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
