import { Button, Checkbox, Form, FormInstance, Input, Modal, Tooltip } from "antd";
import TextArea from "antd/es/input/TextArea";
import { IProject, projectService } from "../../../services";
import { useAppDispatch } from "../../../redux/hooks";
import { actionDisplayNotification } from "../../../redux/notificationSlice";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useRef } from "react";

type ProjectModalProps = {
  open: boolean;
  handleConfirm?: (arg?: unknown) => void;
  handleCancel?: (arg?: unknown) => void;
  formType: "edit" | "create";
  projectToEdit?: IProject;
};

type FormValues = {
  title: string;
  description: string;
  is_public: boolean;
  system_tone: string;
  internal_knowledge_only: boolean;
};

const ProjectModal = ({
  open,
  handleConfirm,
  handleCancel,
  formType,
  projectToEdit,
}: ProjectModalProps) => {
  const formRef = useRef<FormInstance>(null);
  const dispatch = useAppDispatch();
  const isEditing = formType === "edit";

  const handleOk = (e: FormValues) =>{
    try {
      const schema = {
        title: e.title,
        description: e.description,
        is_public: !!e.is_public,
        system_tone: e.system_tone || "",
        internal_knowledge_only: !e.internal_knowledge_only,
      };
      if (isEditing) {
        if (!projectToEdit) return;
        projectService.editProject({ project_id: projectToEdit.id, project: schema });
        console.log("Precisa editar o projeto no front pra mostrar as mudanças de imediato");
      } else {
        projectService.createProject(schema);
      }
      if (handleConfirm) {
        handleConfirm();
      }
      dispatch(
        actionDisplayNotification({
          messages: isEditing ? ["Project edited successfully"] : ["Project created successfully"],
          severity: "success",
        }),
      );
    } catch (err) {
      dispatch(
        actionDisplayNotification({
          messages: isEditing ? ["Error in project editing"] : ["Error in project creation"],
          severity: "error",
        }),
      );
    }
  };

  const handleClose = () => {
    formRef.current?.resetFields();
    if (handleCancel) {
      console.log("executing cancel");
      handleCancel();
    }
  };

  return (
    <Modal
      open={open}
      title={isEditing ? "Edit project" : "Create new project"}
      onOk={handleConfirm}
      onCancel={handleClose}
      destroyOnClose={true}
      afterClose={handleClose}
      footer={[
        <Button key="back" onClick={handleClose}>
          Cancel
        </Button>,
        <Button key="submit" form="project-form" htmlType="submit" type="primary">
          Submit
        </Button>,
      ]}
    >
      <Form
        id="project-form"
        name="basic"
        preserve={false}
        ref={formRef}
        onFinish={handleOk}
        initialValues={{ ...projectToEdit,
          internal_knowledge_only: !projectToEdit?.internal_knowledge_only }}
        autoComplete="off"
        layout="vertical"
        style={{ marginTop: "20px" }}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Project title is required!",
            },
          ]}
        >
          <Input maxLength={30} />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Project description is required!",
            },
          ]}
        >
          <Input maxLength={100} />
        </Form.Item>
        <Form.Item
          label="Base prompt"
          name="system_tone"
          tooltip="Sets the tone and behaviour of the chatbot"
        >
          <TextArea autoSize={{ minRows: 3, maxRows: 5 }} showCount maxLength={800} />
        </Form.Item>
        <Form.Item name="internal_knowledge_only" valuePropName="checked">
          <Checkbox
            defaultChecked={true}
            style={{ display: "flex", alignItems: "center" }}
          >
            Enable ChatGPT external knowledge
            <Tooltip title="When disabled the chatbot will respond based on the uploaded documents only.">
              <QuestionCircleOutlined
                style={{ paddingLeft: "10px", cursor: "help", color: "#8c8c8c" }}
              />
            </Tooltip>
          </Checkbox>
        </Form.Item>
        <Form.Item name="is_public" valuePropName="checked">
          <Checkbox>Public within your organization</Checkbox>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export { ProjectModal };
