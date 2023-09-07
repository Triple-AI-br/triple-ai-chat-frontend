import { Button, Form, Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";

interface NewProjectModalProps {
  open: boolean;
  handleConfirm?: (arg?: unknown) => void
  handleCancel?: (arg?: unknown) => void
}

const NewProjectModal: React.FC<NewProjectModalProps> = ({
  open,
  handleConfirm,
  handleCancel
}) => {

  const handleOk = () => {
    try {
      if(handleConfirm) {
        handleConfirm();
      }
    } catch(err) {
      console.log(err);
    }
  };

  return (
    <Modal
      open={open}
      title="Criar novo projeto"
      onOk={handleConfirm}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancelar
        </Button>
      ]}
    >
      <Form
        name="basic"
        onFinish={handleOk}
        autoComplete="off"
        layout="vertical"
        style={{marginTop: "20px"}}
      >
        <Form.Item
          label="Nome"
          name="name"
          rules={[{ 
            required: true, 
            message: "O nome do projeto é obrigatório!"
          }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Descrição"
          name="description"
          rules={[{ 
            required: true, 
            message: "A descrição do projeto é obrigatória!"
          }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Prompt do projeto"
          name="prompt"
          rules={[{ 
            required: true, 
            message: "O Prompt do projeto é obrigatório!"
          }]}
        >
          <TextArea
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
        Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export {NewProjectModal};