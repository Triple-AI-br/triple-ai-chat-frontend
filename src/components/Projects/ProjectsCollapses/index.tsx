import { useEffect, useState } from "react";
import { IProject } from "../../../services";
import { Divider, Typography } from "antd";
import { ProjectsItem } from "../ProjectCard/ProjectsItem";
import { routesManager } from "../../../routes/routesManager";
import { CardsContainer, StyledCollapse } from "./styled";

type ProjectsCollapsesProps = {
  projects: IProject[];
  openEditModal: React.Dispatch<React.SetStateAction<IProject | undefined>>
}

const ProjectsCollapses: React.FC<ProjectsCollapsesProps> = ({ projects, openEditModal }) => {
  const [publicProjects, setPublicProjects] = useState<IProject[]>([]);
  const [privateProjects, setPrivateProjects] = useState<IProject[]>([]);

  useEffect(() => {
    projects.map((project) => {
      if (project.is_public) {
        setPublicProjects(prev => [...prev, project]);
      } else {
        setPrivateProjects(prev => [...prev, project]);
      }
    });
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
                      onClick={() =>
                        window.open(
                          `${process.env.REACT_APP_BASE_FRONT_URL}${routesManager.getChatRoute(
                            project.id,
                          )}`,
                          "_blank",
                        )}
                    />
                  );
                })}
              </CardsContainer>
            ) : (<Typography>You don&apos;t have any private projects yet</Typography>)
          },
        ]}
      />
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
                      onClick={() =>
                        window.open(
                          `${process.env.REACT_APP_BASE_FRONT_URL}${routesManager.getChatRoute(
                            project.id,
                          )}`,
                          "_blank",
                        )}
                    />
                  );
                })}
              </CardsContainer>
            ) : (<Typography>You don&apos;t have any public projects yet</Typography>)
          }
        ]}
      />
    </>

  );
};

export { ProjectsCollapses };