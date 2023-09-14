import { Base } from "../../layouts/Base";
import { useEffect, useState } from "react";
import { IProject, projectService } from "../../services";
import { Spinner } from "../../components/loaders";
import { Button, Typography } from "antd";
import { TabTopContainer } from "./styled";
import { PlusOutlined } from "@ant-design/icons";
import { ProjectModal } from "../../components/Projects/ProjectModal";
import { ProjectsCollapses } from "../../components/Projects/ProjectsCollapses";

const ProjectsPage = () => {
  const [projects, setProjects] = useState<IProject[]>();
  const [openNewProjectModal, setOpenNewProjectModal] = useState(false);
  const [openEditProjectModal, setOpenEditProjectModal] = useState<IProject | undefined>();

  const fetchProjects = async () => {
    const res = await projectService.listProjects();
    return res;
  };

  useEffect(() => {
    (async () => {
      setProjects(await fetchProjects());
    })();
  }, []);

  const renderProjects = () => {
    switch (projects) {
      case undefined:
        return <Spinner />;
      case null:
        return <Typography>We had a problem retrieving your projects.</Typography>;
      default:
        if (!projects.length) {
          return (
            <>
              <Typography>You don&apos;t have access to any projects yet.</Typography>
              <Typography>
                You may create a new one or ask someone for an invitation to an existing project.
              </Typography>
            </>
          );
        } else {
          return (
            <ProjectsCollapses
              openEditModal={setOpenEditProjectModal}
              projects={projects}
              setProjects={async () => setProjects(await fetchProjects())}
            />
          );
        }
    }
  };

  return (
    <Base title={"Your Projects"}>
      <>
        <TabTopContainer>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setOpenNewProjectModal((prev) => !prev)}
          >
            New Project
          </Button>
        </TabTopContainer>
        <ProjectModal
          open={openNewProjectModal || !!openEditProjectModal}
          handleConfirm={async () => {
            setOpenNewProjectModal(false);
            setOpenEditProjectModal(undefined);
            setProjects(await fetchProjects());
          }}
          handleCancel={() => {
            setOpenNewProjectModal(false);
            setOpenEditProjectModal(undefined);
          }}
          projectToEdit={openEditProjectModal}
          formType={openNewProjectModal ? "create" : "edit"}
        />
        {renderProjects()}
      </>
    </Base>
  );
};

export { ProjectsPage };
