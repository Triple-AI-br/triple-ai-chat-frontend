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
        return <Typography>We had a problem finding your projects</Typography>;
      default:
        if (!projects.length) {
          return <Typography>You don&apos;t have any projects yet</Typography>;
        } else {
          return (
            <ProjectsCollapses openEditModal={setOpenEditProjectModal} projects={projects} />
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
            icon={<PlusOutlined />}
            onClick={() => setOpenNewProjectModal((prev) => !prev)}
          >
            New
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
