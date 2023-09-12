import { useEffect, useState } from "react";
import { IProject, projectService } from "../../../services";
import { Divider, Modal, Typography } from "antd";
import { ProjectsItem } from "../ProjectCard/ProjectsItem";
import { routesManager } from "../../../routes/routesManager";
import { CardsContainer, StyledCollapse } from "./styled";
import { WarningOutlined } from "@ant-design/icons";
import { useAppDispatch } from "../../../redux/hooks";
import { actionDisplayNotification } from "../../../redux/notificationSlice";

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
  const dispatch = useAppDispatch();
  const [publicProjects, setPublicProjects] = useState<IProject[]>([]);
  const [privateProjects, setPrivateProjects] = useState<IProject[]>([]);
  const [modal, contextHolder] = Modal.useModal();

  const confirmRemoveProjectModal = (id: number | string, title: string) => {
    modal.confirm({
      title: "Confirm",
      icon: <WarningOutlined style={{ color: "#ff4d4f" }} />,
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
    let publicProjects: IProject[] = [];
    let privateProjects: IProject[] = [];
    projects.map((project) => {
      if (project.is_public) {
        publicProjects = [...publicProjects, project];
      } else {
        privateProjects = [...privateProjects, project];
      }
    });
    setPublicProjects(publicProjects);
    setPrivateProjects(privateProjects);
  }, [projects]);

  return (
    <>
      <StyledCollapse
        defaultActiveKey={"1"}
        bordered={false}
        items={[
          {
            key: "1",
            label: "Private Projects",
            children: privateProjects.length ? (
              <CardsContainer>
                {privateProjects.map((project) => {
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
              <Typography>You don&apos;t have any private projects yet</Typography>
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
            label: "Public Projects",
            children: publicProjects.length ? (
              <CardsContainer>
                {publicProjects.map((project) => {
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
              <Typography>You don&apos;t have any public projects yet</Typography>
            ),
          },
        ]}
      />
    </>
  );
};

export { ProjectsCollapses };
