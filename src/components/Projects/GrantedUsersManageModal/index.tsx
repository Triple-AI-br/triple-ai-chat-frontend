import { Button, Form, Switch, Transfer, Typography } from "antd";
import { IGrantedUsers, IProject, projectService } from "../../../services";
import { useEffect, useState } from "react";
import { PermissionsArray, usersService } from "../../../services/users";
import { useAppDispatch } from "../../../redux/hooks";
import { StyledModal } from "./styled";
import { actionDisplayNotification } from "../../../redux/notificationSlice";
import { TransferDirection } from "antd/es/transfer";
import { useTranslation } from "react-i18next";
const { Text } = Typography;

type ManageGrantedUsersModalProps = {
  open: boolean;
  handleConfirm?: (arg?: unknown) => void;
  handleCancel?: (arg?: unknown) => void;
  project: IProject;
  usersInProject: IGrantedUsers[];
};

export interface TransferItem {
  key: string;
  title: string;
  description?: string;
  disabled?: boolean;
}

type Permissions = "files:upload" | "files:delete";

const ManageGrantedUsersModal = ({
  handleConfirm,
  handleCancel,
  open,
  project,
  usersInProject,
}: ManageGrantedUsersModalProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [filteredUserList, setFilteredUsersList] = useState<TransferItem[]>([]);
  const [targetKeys, setTargetKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [permissions, setPermissions] = useState({
    "files:upload": project.is_public,
    "files:delete": project.is_public,
  });

  const projectId = project.id;
  const projectOwner = project.user_owner.id;
  const isPublic = project.is_public;

  const disabledSwitch =
    isPublic && permissions["files:upload"] !== permissions["files:delete"]
      ? permissions["files:upload"]
        ? "files:upload"
        : "files:delete"
      : undefined;

  const onConfirm = async () => {
    try {
      if (!targetKeys.length) {
        dispatch(
          actionDisplayNotification({
            messages: [t("pages.sources.components.inviteModal.atLeastOneMessage")],
            severity: "warning",
          }),
        );
        return;
      }
      const schema = {
        projectId: projectId,
        emails: filteredUserList
          .filter((user) => targetKeys.includes(String(user.key)))
          .map((user) => user.title),
        permissions: [
          ...(permissions["files:upload"] ? ["files:upload"] : []),
          ...(permissions["files:delete"] ? ["files:delete"] : []),
        ] as PermissionsArray,
      };
      const res = await projectService.inviteManyUserToProject(schema);
      if (handleConfirm) {
        handleConfirm();
      }
      if (res.failed_to_invite.length) {
        dispatch(
          actionDisplayNotification({
            messages: [
              t("pages.sources.components.inviteModal.errorOnInviteFollowingUsers"),
              ...res.failed_to_invite.map((email) => email),
            ],
            severity: "warning",
          }),
        );
      }
    } catch (err) {
      dispatch(
        actionDisplayNotification({
          messages: [t("global.failureInviteMessage")],
          severity: "warning",
        }),
      );
    } finally {
      setTargetKeys([]);
      setSelectedKeys([]);
    }
  };

  const handleChangePermission = (permission: Permissions, active: boolean) => {
    if (isPublic) {
      // Se o projeto for público, você precisa garantir que pelo menos uma das permissões seja verdadeira
      if (!active) {
        // Verifica se a outra permissão também está desativada
        if (
          (permission === "files:upload" && !permissions["files:delete"]) ||
          (permission === "files:delete" && !permissions["files:upload"])
        ) {
          return;
        }
      }
    }
    setPermissions((prev) => ({ ...prev, [permission]: active }));
  };

  const handleAdd = (nextTargetKeys: string[]) => {
    setTargetKeys(nextTargetKeys);
  };
  const handleDelete = (nextTargetKeys: string[]) => {
    setTargetKeys(nextTargetKeys);
  };

  const onChange = (nextTargetKeys: string[], direction: TransferDirection) => {
    if (direction === "left") {
      handleDelete(nextTargetKeys);
    } else {
      if (targetKeys.length === 50) return;
      if (nextTargetKeys.length > 50) {
        handleAdd(nextTargetKeys.slice(0, 50));
        return;
      }
      handleAdd(nextTargetKeys);
    }
  };

  const onSelectChange = (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  useEffect(() => {
    (async () => {
      try {
        const users = await usersService.listUsers();

        const emailsAlreadyinProject = usersInProject.map((user) => user.email);
        const filterUsersAlreadyInProject = users.filter(
          (user) => !emailsAlreadyinProject?.includes(user.email) && user.id !== projectOwner,
        );
        const schema = filterUsersAlreadyInProject.map((user) => ({
          key: String(user.id),
          title: user.email,
        }));

        setFilteredUsersList(schema);
      } catch (er) {
        setFilteredUsersList([]);
      }
    })();
  }, [usersInProject, open]);

  const handleClose = () => {
    setFilteredUsersList([]);
    setTargetKeys([]);
    setSelectedKeys([]);
    setPermissions({
      "files:upload": project.is_public,
      "files:delete": project.is_public,
    });
    if (handleCancel) {
      handleCancel();
    }
  };

  return (
    <StyledModal
      open={open}
      title={t("pages.sources.components.inviteModal.title")}
      onOk={async () => await onConfirm()}
      onCancel={handleClose}
      destroyOnClose={true}
      afterClose={handleClose}
      footer={[
        <Button key="back" onClick={handleClose}>
          {t("global.cancel")}
        </Button>,
        <Button key="confirm" type="primary" onClick={async () => await onConfirm()}>
          {t("global.submit")}
        </Button>,
      ]}
    >
      <Transfer
        dataSource={filteredUserList}
        status={targetKeys.length >= 50 ? "warning" : ""}
        titles={[
          t("pages.sources.components.inviteModal.availableUsers"),
          t("pages.sources.components.inviteModal.usersToInvite"),
        ]}
        listStyle={{ width: "50%", minHeight: "350px" }}
        footer={() => (targetKeys.length >= 50 ? "Max 50 users" : "")}
        targetKeys={targetKeys}
        disabled={usersInProject.length >= 50}
        showSearch
        selectedKeys={selectedKeys}
        onChange={onChange}
        onSelectChange={onSelectChange}
        render={(item) => item.title}
      />
      <h4>{t("pages.sources.components.inviteModal.permissionsTitle")}</h4>
      <Form autoComplete="off" layout="inline" style={{ marginTop: "20px" }}>
        <Form.Item
          name="files:upload"
          label={t("pages.sources.components.inviteModal.uploadFilesPermissionSwitch")}
          valuePropName="checked"
          labelAlign="right"
          style={{
            borderRadius: "8px",
            border: "1px solid rgba(0, 0, 0, 0.2)",
            padding: "4px 18px",
          }}
        >
          <Switch
            checked={permissions["files:upload"]}
            disabled={disabledSwitch === "files:upload"}
            defaultChecked={project.is_public}
            onChange={(value) => handleChangePermission("files:upload", value)}
          />
        </Form.Item>

        <Form.Item
          name="files:delete"
          label={t("pages.sources.components.inviteModal.deleteFilesPermissionSwitch")}
          valuePropName="checked"
          labelAlign="right"
          style={{
            borderRadius: "8px",
            border: "1px solid rgba(0, 0, 0, 0.2)",
            padding: "4px 18px",
          }}
        >
          <Switch
            checked={permissions["files:delete"]}
            disabled={disabledSwitch === "files:delete"}
            defaultChecked={project.is_public}
            onChange={(value) => handleChangePermission("files:delete", value)}
          />
        </Form.Item>
      </Form>
      {isPublic && !!disabledSwitch ? (
        <Text type="warning">
          {t("pages.sources.components.inviteModal.atLeastOnePermissionMessage")}
        </Text>
      ) : undefined}
    </StyledModal>
  );
};

export { ManageGrantedUsersModal };
