import { Base } from "../../layouts/Base";
import { ProjectsItem } from "../../components/Projects";
import { routesManager } from "../../routes/routesManager";
import { useEffect, useState } from "react";
import { IProject, projectService } from "../../services";
import { Spinner } from "../../components/loaders";
import { Button, Col, Row, Typography } from "antd";
import { TabTopContainer } from "./styled";
import { PlusOutlined } from "@ant-design/icons";
import { ProjectModal } from "../../components/Projects/ProjectModal";


const ProjectsPage = () => {
  const [projects, setProjects] = useState<IProject[]>();
  const [openNewProjectModal, setOpenNewProjectModal] = useState(false);
  const [openEditProjectModal, setOpenEditProjectModal] = useState<IProject | undefined>();

  useEffect(() => {
    (async () => {
      const _projects = await projectService.listProjects();
      setProjects(_projects);
    })();
  }, []);

  const renderProjects = () => {
    switch(projects) {
      case undefined:
        return (
          <Spinner />
        );
      case null:
        return (
          <Typography>
          We haf a problem finding your projects
          </Typography>
        );
      default:
        if(!projects.length) {
          return (
            <Typography>
              You don&apos;t have any projects yet
            </Typography>
          );
        } else {
          return (
            <Row gutter={[24, 24]} align="middle">
              {projects.map(project => (
                <Col
                  key={project.id}
                  className="gutter-row"
                  xs={24}
                  sm={24}
                  md={12}
                  lg={8}
                  xl={8}
                >
                  <ProjectsItem
                    onClick={() =>
                      window.open(
                        `${
                          process.env
                            .REACT_APP_BASE_FRONT_URL
                        }${routesManager.getChatRoute(
                          project.id
                        )}`,
                        "_blank"
                      )
                    }
                    onEdit={setOpenEditProjectModal}
                    project={project}
                  />
                </Col>
              ))}
            </Row>
          );
        }
    }
  };

  return (
    <Base title={"Your AI Chatbots"}>
      <>
        <TabTopContainer>
          <Button
            type="primary"
            icon={ <PlusOutlined /> }
            onClick={() => setOpenNewProjectModal(prev => !prev)}
          >New</Button>
        </TabTopContainer>
        <ProjectModal
          open={openNewProjectModal || !!openEditProjectModal}
          handleCancel={() => {
            setOpenNewProjectModal(false);
            setOpenEditProjectModal(undefined);
          }}
          projectToEdit={openEditProjectModal}
          formType={openNewProjectModal ? "create" : "edit"}
        />
        {
          renderProjects()
        }
      </>
    </Base>
  );
};

export { ProjectsPage };
