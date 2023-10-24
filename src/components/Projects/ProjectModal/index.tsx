import { Button, Checkbox, Form, FormInstance, Input, Modal, Tooltip, theme } from "antd";
import TextArea from "antd/es/input/TextArea";
import { IProject, projectService } from "../../../services";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { actionDisplayNotification } from "../../../redux/notificationSlice";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useEffect, useRef } from "react";
import {
  actionUpdateCustomerInfo,
  selectCustomerData,
  selectUserData,
} from "../../../redux/authenticationSlice";
import { useTranslation } from "react-i18next";
const { useToken } = theme;

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
  enable_external_knowledge: boolean;
};

const ProjectModal = ({
  open,
  handleConfirm,
  handleCancel,
  formType,
  projectToEdit,
}: ProjectModalProps) => {
  const { t } = useTranslation();
  const { token } = useToken();
  const dispatch = useAppDispatch();
  const userData = useAppSelector(selectUserData);
  const customerData = useAppSelector(selectCustomerData);
  const isEditing = formType === "edit";
  const formRef = useRef<FormInstance>(null);
  const defaultBasePrompt =
    "Seja conciso e direto ao ponto." +
    "\nResponda com base apenas nas informações que eu vou te passar aqui abaixo." +
    "\nSe o contexto fornecido não possuir a informação necessária, responda que não sabe.";

  const projectLimitReached =
    customerData &&
    customerData.current_number_of_projects >= customerData.limit_number_of_projects &&
    !isEditing;

  const isOwner =
    isEditing && projectToEdit
      ? userData?.is_superuser || userData?.id === projectToEdit.user_owner.id
      : true;

  const handleOk = async (e: FormValues) => {
    try {
      if (!customerData) return;
      const schema = {
        title: e.title,
        description: e.description,
        is_public: !!e.is_public,
        system_tone: e.system_tone || "",
        internal_knowledge_only: !e.enable_external_knowledge,
      };
      if (isEditing) {
        if (!projectToEdit) return;
        await projectService.editProject({ project_id: projectToEdit.id, project: schema });
      } else {
        if (customerData.current_number_of_projects >= customerData.limit_number_of_projects) {
          handleClose();
          return;
        }
        await projectService.createProject(schema);
      }
      dispatch(
        actionDisplayNotification({
          messages: isEditing
            ? [t("global.successUpdateMessage")]
            : [t("global.successCreateMessage")],
          severity: "success",
        }),
      );
      await dispatch(actionUpdateCustomerInfo(customerData?.id));
    } catch (err) {
      dispatch(
        actionDisplayNotification({
          messages: isEditing
            ? [t("global.failureUpdateMessage")]
            : [t("global.failureCreateMessage")],
          severity: "error",
        }),
      );
    } finally {
      if (handleConfirm) {
        handleConfirm();
      }
    }
  };

  const warning = () => {
    Modal.warning({
      title: t("pages.projects.components.createEditModal.limitReachedOfProjects.title"),
      content: t("pages.projects.components.createEditModal.limitReachedOfProjects.description", {
        customer: customerData?.name,
        projects: customerData?.limit_number_of_projects,
      }),
      onOk: handleClose,
    });
  };

  const handleClose = () => {
    formRef.current?.resetFields();
    if (handleCancel) {
      handleCancel();
    }
  };

  useEffect(() => {
    if (projectLimitReached) warning();
  }, [projectLimitReached]);

  if (projectLimitReached) {
    return <></>;
  }

  return (
    <Modal
      open={open}
      title={
        isEditing
          ? t("pages.projects.components.createEditModal.editModalTitle")
          : t("pages.projects.components.createEditModal.createModalTitle")
      }
      onOk={handleConfirm}
      onCancel={handleClose}
      destroyOnClose={true}
      afterClose={handleClose}
      footer={[
        <Button
          key="back"
          onClick={handleClose}
          style={{ display: !isOwner ? "none" : "inline-block" }}
        >
          {t("global.cancel")}
        </Button>,
        <Button
          key="submit"
          form="project-form"
          htmlType="submit"
          type="primary"
          style={{ display: !isOwner ? "none" : "inline-block" }}
        >
          {t("global.submit")}
        </Button>,
      ]}
    >
      <Form
        id="project-form"
        name="basic"
        preserve={false}
        ref={formRef}
        onFinish={handleOk}
        disabled={!isOwner}
        initialValues={
          projectToEdit
            ? {
                ...projectToEdit,
                enable_external_knowledge: !projectToEdit.internal_knowledge_only,
              }
            : {
                system_tone: defaultBasePrompt,
                enable_external_knowledge: false,
                is_public: true,
              }
        }
        autoComplete="off"
        layout="vertical"
        style={{ marginTop: "20px" }}
      >
        <Form.Item
          label={t("pages.projects.components.createEditModal.title")}
          name="title"
          rules={[
            {
              required: true,
              message: t("pages.projects.components.createEditModal.required.title"),
            },
          ]}
        >
          <Input maxLength={30} />
        </Form.Item>
        <Form.Item
          label={t("pages.projects.components.createEditModal.description")}
          name="description"
          rules={[
            {
              required: true,
              message: t("pages.projects.components.createEditModal.required.description"),
            },
          ]}
        >
          <Input maxLength={100} />
        </Form.Item>
        <Form.Item
          label={t("pages.projects.components.createEditModal.basePrompt")}
          name="system_tone"
          tooltip={t("pages.projects.components.createEditModal.tooltip.basePrompt")}
        >
          <TextArea autoSize={{ minRows: 3, maxRows: 6 }} showCount maxLength={800} />
        </Form.Item>
        <Form.Item name="enable_external_knowledge" valuePropName="checked">
          <Checkbox style={{ display: "flex", alignItems: "center" }}>
            {t("pages.projects.components.createEditModal.externalKnowledge")}
            <Tooltip
              title={t("pages.projects.components.createEditModal.tooltip.externalKnowledge")}
            >
              <QuestionCircleOutlined
                style={{
                  paddingLeft: "10px",
                  cursor: "help",
                  color: token.colorBgMask,
                }}
              />
            </Tooltip>
          </Checkbox>
        </Form.Item>
        <Form.Item name="is_public" valuePropName="checked">
          <Checkbox>{t("pages.projects.components.createEditModal.public")}</Checkbox>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export { ProjectModal };
