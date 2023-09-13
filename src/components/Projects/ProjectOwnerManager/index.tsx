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
import { useTranslation } from "react-i18next";

type ProjectOwnerManager = {
  project?: IProject;
  span: number;
};

const ProjectOwnerManager: React.FC<ProjectOwnerManager> = ({ project, span = 11 }) => {
  const { t } = useTranslation();
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
      title: t("global.confirm"),
      icon: <ExclamationCircleOutlined />,
      content: t("pages.sources.components.removeGrantedUserConfirmation", { user: email }),
      okText: t("global.delete"),
      cancelText: t("global.cancel"),
      onOk: async () => {
        try {
          if (!project?.id) return;
          await projectService.deleteUserFromProject(project.id, email);
          await setGrantedUsers();
        } catch (err) {
          dispatch(
            actionDisplayNotification({
              messages: [t("global.failureDeleteMessage")],
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
      title: t("global.confirm"),
      icon: <ExclamationCircleOutlined />,
      closable: true,
      content: (
        <PermissionContainer>
          <h2>{t("pages.sources.components.permissionsFor", { user: grantedUser.email })}</h2>
          <Select
            mode="multiple"
            allowClear
            placeholder="Please select"
            defaultValue={grantedUser.permissions}
            onChange={(e) => (permissionsToApply = e)}
            options={[
              {
                label: t("pages.sources.components.inviteModal.uploadFilesPermissionSwitch"),
                value: "files:upload",
              },
              {
                label: t("pages.sources.components.inviteModal.deleteFilesPermissionSwitch"),
                value: "files:delete",
              },
            ]}
          />
        </PermissionContainer>
      ),
      okText: t("global.confirm"),
      cancelText: t("global.cancel"),
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
              messages: [t("global.failureUpdateMessage")],
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
          messages: [t("global.fetchErrorWarning")],
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
        <Form.Item
          name="user"
          required={false}
          label={t("pages.sources.components.searchUserInputLabel")}
        >
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
          projectOwnerId={project.user_owner.id}
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
        <h1>{t("pages.sources.components.shareProjectTitle")}</h1>
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={() => setOpenModal((prev) => !prev)}
          disabled={!isUserOwner}
        >
          {t("pages.sources.components.shareProjectBtn")}
        </Button>
        <Typography.Text type="secondary">
          {t("pages.sources.owner")}
          {": "}
          {project?.user_owner.id === userData?.id ? (
            t("global.you")
          ) : (
            <Typography.Link
              href={`mailto:${project?.user_owner.email}?subject=Project: "${project?.title}" | Triple AI`}
            >
              {project?.user_owner.email.split("@")[0]}
            </Typography.Link>
          )}
        </Typography.Text>
        <List
          style={{ width: "100%", maxHeight: "500px", overflowY: "scroll" }}
          locale={{ emptyText: t("pages.global.noUsers") }}
          header={ListHeader()}
          footer={
            <ListFooter>
              {t("pages.sources.grantedUsersCountMessage", {
                count: allUsersWithAccess.length,
                project: project?.title,
              })}
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
                  {t("global.edit")}
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
                  {t("global.delete")}
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
