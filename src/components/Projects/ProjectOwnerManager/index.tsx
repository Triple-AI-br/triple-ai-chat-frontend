import { Button, Col, Form, Input, List, Modal, Select, Space, Typography } from "antd";
import { IGrantedUsers, IProject, projectService } from "../../../services";
import { useEffect, useState } from "react";
import { ListFooter, ListUserContainer, PermissionContainer } from "./styled";
import { ExclamationCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { ManageGrantedUsersModal } from "../GrantedUsersManageModal";
import { PermissionsArray } from "../../../services/users";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { actionDisplayNotification } from "../../../redux/notificationSlice";
import { selectUserData } from "../../../redux/authenticationSlice";

type ProjectOwnerManager = {
  project?: IProject;
  span: number;
};

const ProjectOwnerManager: React.FC<ProjectOwnerManager> = ({ project, span = 11 }) => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(selectUserData);

  const [allUsersWithAccess, setAllUsersWithAccess] = useState<IGrantedUsers[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filteredUsersWithAccess, setFilteredUsersWithAccess] =
    useState<IGrantedUsers[]>(allUsersWithAccess);
  const [modal, contextHolder] = Modal.useModal();

  const isUserOwner = project?.user_owner.id === userData?.id || userData?.is_superuser;

  const confirmRemoveUserModal = (email: string) => {
    modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure you want to remove the user "${email}" from project?`,
      okText: "Remove",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          if (!project?.id) return;
          await projectService.deleteUserFromProject(project.id, email);
          await setGrantedUsers();
        } catch (err) {
          dispatch(
            actionDisplayNotification({
              messages: ["An error occurred while removing user from project."],
              severity: "error",
            }),
          );
        }
      },
    });
  };

  let permissionsToApply: PermissionsArray = [];

  const changePermissions = (grantedUser: IGrantedUsers) => {
    permissionsToApply = grantedUser.permissions;
    modal.info({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      closable: true,
      content: (
        <PermissionContainer>
          <h2>{`Permissions for ${grantedUser.email}`}</h2>
          <Select
            mode="multiple"
            allowClear
            placeholder="Please select"
            defaultValue={grantedUser.permissions}
            onChange={(e) => (permissionsToApply = e)}
            options={[
              { label: "Upload Files", value: "files:upload" },
              { label: "Delete Files", value: "files:delete" },
            ]}
          />
        </PermissionContainer>
      ),
      okText: "Confirm",
      onOk: async () => {
        try {
          if (permissionsToApply === grantedUser.permissions || !project?.id) return;
          const schema = {
            projectId: project.id,
            emails: [grantedUser.email],
            permissions: permissionsToApply,
          };
          await projectService.inviteManyUserToProject(schema);
          await setGrantedUsers();
        } catch (err) {
          dispatch(
            actionDisplayNotification({
              messages: ["An error occurred while editing user permissions."],
              severity: "error",
            }),
          );
        } finally {
          permissionsToApply = [];
        }
      },
    });
  };

  const fetchGrantedUsers = async (projectId: string | number) => {
    const userThatsHasAccess = await projectService.getGrantedUsers(projectId);
    return userThatsHasAccess;
  };

  const setGrantedUsers = async () => {
    try {
      setLoading(true);
      if (!project?.id) return;
      const grantedUsers = await fetchGrantedUsers(project.id);
      setAllUsersWithAccess(grantedUsers);
      setFilteredUsersWithAccess(grantedUsers);
    } catch (er) {
      dispatch(
        actionDisplayNotification({
          messages: ["An error occurred while fetching granted users."],
          severity: "warning",
        }),
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      setGrantedUsers();
    })();
  }, [project]);

  const ListHeader = () => {
    return (
      <Form layout="vertical">
        <Form.Item name="user" required={false} label="Find users in project:">
          <Space.Compact style={{ width: "100%" }}>
            <Input
              onChange={(e) => {
                const value = e.target.value.trim().toLowerCase();
                if (e.target.value !== "") {
                  setFilteredUsersWithAccess(
                    allUsersWithAccess.filter((user) => user.email.includes(value)),
                  );
                } else {
                  setFilteredUsersWithAccess(allUsersWithAccess);
                }
              }}
              allowClear={true}
            />
          </Space.Compact>
        </Form.Item>
      </Form>
    );
  };

  return (
    <Col span={span}>
      {project ? (
        <ManageGrantedUsersModal
          open={openModal}
          projectId={project.id}
          handleCancel={() => setOpenModal(false)}
          handleConfirm={async () => {
            setOpenModal(false);
            setGrantedUsers();
          }}
          usersInProject={allUsersWithAccess}
        />
      ) : null}
      {contextHolder}
      <ListUserContainer>
        <h1>Project sharing</h1>
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={() => setOpenModal((prev) => !prev)}
          disabled={!isUserOwner}
        >
          Share with others
        </Button>
        <List
          style={{ width: "100%", maxHeight: "500px", overflowY: "scroll" }}
          locale={{ emptyText: "No users." }}
          header={ListHeader()}
          footer={
            <ListFooter>
              <span>{allUsersWithAccess.length}</span> user
              {allUsersWithAccess.length !== 1 && "s"} have access to the project{" "}
              <span>{project?.title}</span>
            </ListFooter>
          }
          bordered={true}
          loading={loading}
          dataSource={filteredUsersWithAccess}
          itemLayout="horizontal"
          renderItem={(item) => (
            <List.Item
              actions={[
                <a
                  key="list-loadmore-edit"
                  style={{
                    color: !isUserOwner ? "gray" : "-moz-initial",
                    cursor: !isUserOwner ? "not-allowed" : "pointer",
                  }}
                  onClick={() => {
                    if (!isUserOwner) return;
                    changePermissions(item);
                  }}
                >
                  edit
                </a>,
                <a
                  key="list-loadmore-more"
                  style={{
                    color: !isUserOwner ? "gray" : "red",
                    cursor: !isUserOwner ? "not-allowed" : "pointer",
                  }}
                  onClick={() => {
                    if (!isUserOwner) return;

                    confirmRemoveUserModal(item.email);
                  }}
                >
                  Remove
                </a>,
              ]}
            >
              <Typography.Text>{item.email}</Typography.Text>
            </List.Item>
          )}
        />
      </ListUserContainer>
    </Col>
  );
};

export { ProjectOwnerManager };
