import { useEffect, useState } from "react";
import { IProject, projectService } from "../../../services";
import { Divider, Modal, Typography, theme } from "antd";
import { ProjectsItem } from "../ProjectCard/ProjectsItem";
import { routesManager } from "../../../routes/routesManager";
import { CardsContainer, StyledCollapse } from "./styled";
import { WarningOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { actionDisplayNotification } from "../../../redux/notificationSlice";
import {
  actionUpdateCustomerInfo,
  selectCustomerData,
  selectUserData,
} from "../../../redux/authenticationSlice";
import { useTranslation } from "react-i18next";
const { useToken } = theme;

type ProjectsCollapsesProps = {
  projects: IProject[];
  openEditModal: React.Dispatch<React.SetStateAction<IProject | undefined>>;
  setProjects: () => void;
};

const ProjectsCollapses: React.FC<ProjectsCollapsesProps> = ({
  projects,
  openEditModal,
  setProjects,
}) => {
  const { token } = useToken();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const userData = useAppSelector(selectUserData);
  const customerData = useAppSelector(selectCustomerData);

  const [myProjects, setMyProjects] = useState<IProject[]>([]);
  const [sharedProjects, setSharedProjects] = useState<IProject[]>([]);
  const [modal, contextHolder] = Modal.useModal();

  const confirmRemoveProjectModal = (id: number | string, title: string) => {
    modal.confirm({
      title: t("global.confirm"),
      icon: <WarningOutlined style={{ color: token.colorError }} />,
      content: t("pages.projects.components.deleteConfirmationMessage", {
        project: title,
      }),
      okText: t("global.delete"),
      okButtonProps: { danger: true },
      cancelText: t("global.cancel"),
      onOk: async () => {
        try {
          await projectService.deleteProject(id);
          setProjects();
          if (customerData) await dispatch(actionUpdateCustomerInfo(customerData.id));
          dispatch(
            actionDisplayNotification({
              messages: [t("global.successDeletedMessage")],
              severity: "success",
            }),
          );
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

  useEffect(() => {
    if (!userData) return;
    let myProjectsBuffer: IProject[] = [];
    let sharedProjectsBuffer: IProject[] = [];
    projects.forEach((project) => {
      if (project.user_owner.email.toLowerCase() === userData.email.toLowerCase()) {
        myProjectsBuffer = [...myProjectsBuffer, project];
      } else {
        sharedProjectsBuffer = [...sharedProjectsBuffer, project];
      }
    });
    setMyProjects(myProjectsBuffer);
    setSharedProjects(sharedProjectsBuffer);
  }, [projects]);

  return (
    <>
      <StyledCollapse
        defaultActiveKey={"1"}
        bordered={false}
        items={[
          {
            key: "1",
            label: t("pages.projects.components.collapse.your"),
            children: myProjects.length ? (
              <CardsContainer>
                {myProjects.map((project) => {
                  return (
                    <ProjectsItem
                      key={project.id}
                      project={project}
                      onEdit={openEditModal}
                      confirmRemoveProjectModal={confirmRemoveProjectModal}
                      onClick={() =>
                        window.open(
                          `${process.env.REACT_APP_BASE_FRONT_URL}${routesManager.getChatRoute(
                            project.id,
                          )}`,
                          "_blank",
                        )
                      }
                    />
                  );
                })}
              </CardsContainer>
            ) : (
              <Typography>{t("pages.projects.noProjectsMessage")}</Typography>
            ),
          },
        ]}
      />
      {contextHolder}
      <Divider></Divider>
      <StyledCollapse
        defaultActiveKey={"1"}
        bordered={false}
        items={[
          {
            key: "1",
            label: t("pages.projects.components.collapse.shared"),
            children: sharedProjects.length ? (
              <CardsContainer>
                {sharedProjects.map((project) => {
                  return (
                    <ProjectsItem
                      key={project.id}
                      project={project}
                      onEdit={openEditModal}
                      confirmRemoveProjectModal={confirmRemoveProjectModal}
                      onClick={() =>
                        window.open(
                          `${process.env.REACT_APP_BASE_FRONT_URL}${routesManager.getChatRoute(
                            project.id,
                          )}`,
                          "_blank",
                        )
                      }
                    />
                  );
                })}
              </CardsContainer>
            ) : (
              <Typography>{t("pages.projects.noProjectsMessage")}</Typography>
            ),
          },
        ]}
      />
    </>
  );
};

export { ProjectsCollapses };
