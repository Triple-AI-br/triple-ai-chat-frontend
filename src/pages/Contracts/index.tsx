/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Select, UploadProps, message } from "antd";
import { Base } from "../../layouts/Base";
import Dragger from "antd/es/upload/Dragger";
import { InboxOutlined } from "@ant-design/icons";
import { UploadContainer } from "./styled";
import { contractCategories, represent } from "./constansts";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { routesManager } from "../../routes/routesManager";
import { contractsServices } from "../../services";
import { useAppDispatch } from "../../redux/hooks";
import { actionAddContract } from "../../redux/contractSlice";
import { useTranslation } from "react-i18next";
import { RcFile } from "antd/es/upload";

type FieldType = {
  contract_category: string;
  represent_part: string;
};

const ContractPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [fileConverted, setFileConverted] = useState<{ fileName: string; htmlContent: string }>();

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
        const formdata = new FormData();
        formdata.append("file", file as Blob, "Contrato.docx");
        console.log(file);
        contractsServices
          .convertContractToHTML(formdata)
          .then((res) =>
            setFileConverted({ htmlContent: res.html_content, fileName: uploadedFile.name }),
          )
          .catch(() => message.error("File could not be converted to HTML"));
        if (onSuccess) onSuccess("sucess");
      } catch (error) {
        if (onError) onError(error as ProgressEvent<EventTarget>);
      }
    },
  };

  const handleSubmit = (formValues: FieldType) => {
    if (!fileConverted) return;
    dispatch(
      actionAddContract({
        htmlContent: fileConverted.htmlContent,
        fileName: fileConverted.fileName,
        category: formValues.contract_category,
        representPart: formValues.represent_part,
      }),
    );
    navigate(routesManager.getContractAnalysisRoute());
  };

  return (
    <Base title={t("pages.contracts.title")}>
      <UploadContainer>
        <Form layout="vertical" onFinish={handleSubmit}>
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
              <p className="ant-upload-hint">
                {t("pages.contracts.components.upload.placeholder")}
              </p>
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
              options={represent}
              placeholder={t("pages.contracts.components.representPart.placeholder")}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {t("global.submit")}
            </Button>
          </Form.Item>
        </Form>
      </UploadContainer>
    </Base>
  );
};

export { ContractPage };
