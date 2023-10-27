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

const ContractPage: React.FC = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<Blob>();

  const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const props: UploadProps = {
    name: "file",
    beforeUpload(file) {
      return new Promise((resolve, reject) => {
        if (file.size > 2_000_000) {
          console.log(file);
          reject("File size exceeded");
          message.error("File size exceeded");
        } else {
          resolve("sucess");
        }
      });
    },
    customRequest({ file, onSuccess, onError }) {
      try {
        setFile(file as Blob);
        if (onSuccess) onSuccess("sucess");
      } catch (error) {
        if (onError) onError(error as ProgressEvent<EventTarget>);
      }
    },
  };

  return (
    <Base title="Contracts">
      <UploadContainer>
        <Form
          layout="vertical"
          onFinish={(values) => {
            console.log(values, file);
            navigate(routesManager.getContractAnalysisRoute(1));
          }}
        >
          <Form.Item
            name="contract_file"
            valuePropName="fileList"
            getValueFromEvent={(event) => event?.fileList}
            rules={[
              { required: true, message: "Please upload a contract" },
              {
                validator(_, fileList) {
                  return new Promise((resolve, reject) => {
                    // Limitação de tamanho do contrato em bytes (2MB)
                    if (fileList && fileList[0].size > 2_000_000) {
                      reject("File size exceeded");
                    } else if (fileList && fileList[0].type !== "application/pdf") {
                      reject("File msut be a PDF");
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
