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

type FieldType = {
  contract_category: string;
  represent_part: string;
};

const ContractPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [file, setFile] = useState<string>();

  const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const props: UploadProps = {
    name: "file",
    beforeUpload(file) {
      return new Promise((resolve, reject) => {
        if (file.size > 5_000_000) {
          reject("File size exceeded");
          message.error("File size exceeded");
        } else {
          resolve("sucess");
        }
      });
    },
    customRequest({ file, onSuccess, onError }) {
      try {
        const formdata = new FormData();
        formdata.append("file", file as Blob, "Contrato.docx");
        contractsServices
          .convertContractToHTML(formdata)
          .then((res) => setFile(res.html_content))
          .catch(() => message.error("File could not be converted to HTML"));
        if (onSuccess) onSuccess("sucess");
      } catch (error) {
        if (onError) onError(error as ProgressEvent<EventTarget>);
      }
    },
  };

  const handleSubmit = (formValues: FieldType) => {
    if (!file) return;
    dispatch(
      actionAddContract({
        htmlContent: file,
        category: formValues.contract_category,
        representPart: formValues.represent_part,
      }),
    );
    navigate(routesManager.getContractAnalysisRoute(1));
  };

  return (
    <Base title="Contracts">
      <UploadContainer>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="contract_file"
            valuePropName="fileList"
            getValueFromEvent={(event) => event?.fileList}
            rules={[
              { required: true, message: "Please upload a contract" },
              {
                validator(_, fileList) {
                  return new Promise((resolve, reject) => {
                    // Limitação de tamanho do contrato em bytes (5MB)
                    if (fileList && fileList.length && fileList[0].size > 5_000_000) {
                      reject("File size exceeded");
                    } else if (
                      fileList &&
                      fileList.length &&
                      !fileList[0].type.includes("wordprocessingml")
                    ) {
                      reject("File msut be a DOCX");
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
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">Support for a single or bulk upload.</p>
            </Dragger>
          </Form.Item>
          <Form.Item
            name="contract_category"
            label="Contract category"
            rules={[{ required: true, message: "Please select a contract category" }]}
          >
            <Select
              options={contractCategories}
              showSearch
              placeholder="Select a contract category"
              optionFilterProp="children"
              filterOption={filterOption}
              allowClear
            />
          </Form.Item>
          <Form.Item
            name="represent_part"
            label="Part you represent"
            rules={[{ required: true, message: "Please select which part you represent" }]}
          >
            <Select options={represent} placeholder="What part are you representing?" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </UploadContainer>
    </Base>
  );
};

export { ContractPage };
