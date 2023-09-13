import { Button, Form, Switch, Transfer } from "antd";
import { IGrantedUsers, projectService } from "../../../services";
import { useEffect, useState } from "react";
import { PermissionsArray, usersService } from "../../../services/users";
import { useAppDispatch } from "../../../redux/hooks";
import { StyledModal } from "./styled";
import { actionDisplayNotification } from "../../../redux/notificationSlice";
import { TransferDirection } from "antd/es/transfer";

type ManageGrantedUsersModalProps = {
  open: boolean;
  handleConfirm?: (arg?: unknown) => void;
  handleCancel?: (arg?: unknown) => void;
  projectId: string | number;
  projectOwnerId: number;
  usersInProject: IGrantedUsers[];
};

export interface TransferItem {
  key: string;
  title: string;
  description?: string;
  disabled?: boolean;
}

const ManageGrantedUsersModal = ({
  handleConfirm,
  handleCancel,
  open,
  projectId,
  projectOwnerId,
  usersInProject,
}: ManageGrantedUsersModalProps) => {
  const dispatch = useAppDispatch();

  const [filteredUserList, setFilteredFilterList] = useState<TransferItem[]>([]);
  const [targetKeys, setTargetKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [permissions, setPermissions] = useState({ "files:upload": false, "files:delete": false });

  const onConfirm = async () => {
    try {
      if (!targetKeys.length) {
        dispatch(
          actionDisplayNotification({
            messages: ["You must select at least one user."],
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
              "The following users were not invited:",
              ...res.failed_to_invite.map((email) => email),
            ],
            severity: "warning",
          }),
        );
      }
    } catch (err) {
      dispatch(
        actionDisplayNotification({
          messages: ["Problem with Invites"],
          severity: "warning",
        }),
      );
    } finally {
      setTargetKeys([]);
      setSelectedKeys([]);
    }
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
        console.log(nextTargetKeys.slice(0, 50));
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
          (user) => !emailsAlreadyinProject?.includes(user.email) && user.id !== projectOwnerId,
        );
        const schema = filterUsersAlreadyInProject.map((user) => ({
          key: String(user.id),
          title: user.email,
        }));

        setFilteredFilterList(schema);
      } catch (er) {
        setFilteredFilterList([]);
      }
    })();
  }, [usersInProject]);

  return (
    <StyledModal
      open={open}
      title={"Add new user to project"}
      onOk={async () => await onConfirm()}
      onCancel={handleCancel}
      destroyOnClose={true}
      afterClose={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="confirm" type="primary" onClick={async () => await onConfirm()}>
          Submit
        </Button>,
      ]}
    >
      <Transfer
        dataSource={filteredUserList}
        status={targetKeys.length >= 50 ? "warning" : ""}
        titles={["Available users", "Users to invite"]}
        listStyle={{ width: "50%", minHeight: "350px" }}
        footer={() => (targetKeys.length >= 50 ? "Max 50 users" : "")}
        targetKeys={targetKeys}
        showSearch
        selectedKeys={selectedKeys}
        onChange={onChange}
        onSelectChange={onSelectChange}
        render={(item) => item.title}
      />
      <h4>Permissions</h4>
      <Form autoComplete="off" layout="inline" style={{ marginTop: "20px" }}>
        <Form.Item
          name="files:upload"
          label="Upload files"
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
            onChange={(value) => setPermissions((prev) => ({ ...prev, "files:upload": value }))}
          />
        </Form.Item>

        <Form.Item
          name="files:delete"
          label="Delete files"
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
            onChange={(value) => setPermissions((prev) => ({ ...prev, "files:delete": value }))}
          />
        </Form.Item>
      </Form>
    </StyledModal>
  );
};

export { ManageGrantedUsersModal };
