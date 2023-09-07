import { Base } from "../../layouts/Base";
import { ProjectsItem } from "../../components/Projects";
import { routesManager } from "../../routes/routesManager";
import { useEffect, useState } from "react";
import { IProject, projectService } from "../../services";
import { Spinner } from "../../components/loaders";
import { Button, Col, Row, Typography } from "antd";
import { TabTopContainer } from "./styled";
import { PlusOutlined } from "@ant-design/icons";
import { NewProjectModal } from "../../components/Projects/NewProjectModal";


const ProjectsPage = () => {
  const [projects, setProjects] = useState<IProject[]>();
  const [openNewProjectModal, setOpenNewProjectModal] = useState(false);

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
                    title={project.title}
                    description={project.description}
                    id={project.id}
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
          >Novo</Button>
        </TabTopContainer>
        <NewProjectModal
          open={openNewProjectModal}
          handleCancel={() => setOpenNewProjectModal(false)}
        />
        {
          renderProjects()
        }
      </>
    </Base>
  );
};

export { ProjectsPage };
