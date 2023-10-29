import { InboxOutlined } from "@ant-design/icons";
import { Button, Form, Modal, Select } from "antd";
import Dragger from "antd/es/upload/Dragger";
import { useNavigate } from "react-router-dom";
import { routesManager } from "../../../routes/routesManager";

type ContractModal = {
  open: boolean;
  handleClose?: () => void;
  handleSubmit?: () => void;
};

const ContractModal: React.FC<ContractModal> = ({ open }) => {
  const navigate = useNavigate();
  return (
    <Modal
      title="New contract"
      open={open}
      footer={[
        <Button type="primary" key="1" onClick={() => navigate(routesManager.getSourcesRoute(1))}>
          Submit
        </Button>,
        <Button key="2" onClick={() => navigate(routesManager.getSourcesRoute(1))}>
          Cancel
        </Button>,
      ]}
    >
      <Form>
        <Dragger>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from uploading company data or
            other banned files.
          </p>
        </Dragger>
        <Form.Item label="Contract category">
          <Select />
        </Form.Item>
        <Form.Item label="Who received?">
          <Select />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export { ContractModal };
