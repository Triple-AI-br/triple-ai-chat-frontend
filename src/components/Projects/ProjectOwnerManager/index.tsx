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
  projectId: string | number;
  span: number;
};

const ProjectOwnerManager: React.FC<ProjectOwnerManager> = ({ projectId, span = 11 }) => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(selectUserData);

  const [project, setProject] = useState<IProject>();
  const [peoplesThatsHasAccess, setPeoplesThatsHasAccess] = useState<IGrantedUsers[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [filteredUsersThatsHasAccess, setFilteredUsersThatsHasAccess] =
    useState<IGrantedUsers[]>(peoplesThatsHasAccess);
  const [modal, contextHolder] = Modal.useModal();

  const isUserOwner = project?.user_owner.id === userData?.id;

  const confirmRemoveUserModal = (email: string) => {
    modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure you want to remove the user "${email}" from project?`,
      okText: "Remove",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await projectService.deleteUserFromProject(projectId, email);
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
    modal.info({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: (
        <PermissionContainer>
          {(permissionsToApply = grantedUser.permissions)}
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
          if (permissionsToApply === grantedUser.permissions) return;
          const schema = {
            projectId,
            email: grantedUser.email,
            permissions: permissionsToApply,
          };
          await projectService.inviteUserToProject(schema);
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

  const resetPeoplesThatsHasAccess = () => setFilteredUsersThatsHasAccess(peoplesThatsHasAccess);

  const fetchGrantedUsers = async () => {
    const userThatsHasAccess = await projectService.getGrantedUsers(projectId);
    return userThatsHasAccess;
  };

  const setGrantedUsers = async () => {
    const grantedUsers = await fetchGrantedUsers();
    setPeoplesThatsHasAccess(grantedUsers);
    setFilteredUsersThatsHasAccess(grantedUsers);
  };

  useEffect(() => {
    (async () => {
      const project = await projectService.getProject(projectId);
      setProject(project);
      setGrantedUsers();
    })();
  }, []);

  const ListHeader = () => {
    return (
      <Form
        layout="vertical"
        onFinish={(e) =>
          setPeoplesThatsHasAccess((prev) =>
            prev.filter((people) => people.email.includes(e.user || "")),
          )
        }
      >
        <Form.Item name="user" required={false} label="Find users in project:">
          <Space.Compact style={{ width: "100%" }}>
            <Input
              onChange={(e) => e.target.value === "" && resetPeoplesThatsHasAccess()}
              allowClear={true}
            />
          </Space.Compact>
        </Form.Item>
      </Form>
    );
  };

  // if (isUserOwner) {
  //   return <Typography.Text></Typography.Text>;
  // }
  return (
    <Col span={span}>
      <ManageGrantedUsersModal
        open={openModal}
        projectId={projectId}
        handleCancel={() => setOpenModal(false)}
        handleConfirm={async () => {
          setOpenModal(false);
          setGrantedUsers();
        }}
        usersInProject={peoplesThatsHasAccess}
      />
      {contextHolder}
      <ListUserContainer>
        <h1>Project sharing</h1>
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={() => setOpenModal((prev) => !prev)}
          disabled={!isUserOwner}
        >
          Add new
        </Button>
        <List
          style={{ width: "100%", maxHeight: "500px", overflowY: "scroll" }}
          header={ListHeader()}
          footer={
            <ListFooter>
              <span>{peoplesThatsHasAccess.length}</span> user
              {peoplesThatsHasAccess.length !== 1 && "s"} have access to the project{" "}
              <span>{project?.title}</span>
            </ListFooter>
          }
          bordered={true}
          dataSource={filteredUsersThatsHasAccess}
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
