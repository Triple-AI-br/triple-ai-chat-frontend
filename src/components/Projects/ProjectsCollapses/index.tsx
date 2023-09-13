import { useEffect, useState } from "react";
import { IProject, projectService } from "../../../services";
import { Divider, Modal, Typography, theme } from "antd";
import { ProjectsItem } from "../ProjectCard/ProjectsItem";
import { routesManager } from "../../../routes/routesManager";
import { CardsContainer, StyledCollapse } from "./styled";
import { WarningOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { actionDisplayNotification } from "../../../redux/notificationSlice";
import { selectUserData } from "../../../redux/authenticationSlice";
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
  const dispatch = useAppDispatch();
  const [myProjects, setMyProjects] = useState<IProject[]>([]);
  const [sharedProjects, setSharedProjects] = useState<IProject[]>([]);
  const [modal, contextHolder] = Modal.useModal();
  const userData = useAppSelector(selectUserData);

  const confirmRemoveProjectModal = (id: number | string, title: string) => {
    modal.confirm({
      title: "Confirm",
      icon: <WarningOutlined style={{ color: token.colorError }} />,
      content: `Are you sure you want to delete project "${title}"?`,
      okText: "Delete",
      okButtonProps: { danger: true },
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await projectService.deleteProject(id);
          setProjects();
          dispatch(
            actionDisplayNotification({
              messages: ["Sucessfully deleted project."],
              severity: "success",
            }),
          );
        } catch (err) {
          dispatch(
            actionDisplayNotification({
              messages: ["An error occurred while deleting project."],
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
            label: "Your Projects",
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
              <Typography>You don&apos;t own any projects yet</Typography>
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
            label: "Projects shared with you",
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
              <Typography>No projects shared with you yet</Typography>
            ),
          },
        ]}
      />
    </>
  );
};

export { ProjectsCollapses };
