import { Base } from "../../layouts/Base";
import { useEffect, useState } from "react";
import { IProject, projectService } from "../../services";
import { Spinner } from "../../components/loaders";
import { Button, Typography } from "antd";
import { TabTopContainer } from "./styled";
import { PlusOutlined } from "@ant-design/icons";
import { ProjectModal } from "../../components/Projects/ProjectModal";
import { ProjectsCollapses } from "../../components/Projects/ProjectsCollapses";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../redux/hooks";
import { selectUserData } from "../../redux/authenticationSlice";

const ProjectsPage = () => {
  const { t } = useTranslation();
  const userData = useAppSelector(selectUserData);
  const [projects, setProjects] = useState<IProject[]>();
  const [openNewProjectModal, setOpenNewProjectModal] = useState(false);
  const [openEditProjectModal, setOpenEditProjectModal] = useState<IProject | undefined>();

  const fetchProjects = async () => {
    const res = await projectService.listProjects();
    return res;
  };

  useEffect(() => {
    if (!userData?.id) return;
    (async () => {
      setProjects(await fetchProjects());
    })();
  }, [userData]);

  const renderProjects = () => {
    switch (projects) {
      case undefined:
        return <Spinner />;
      case null:
        return <Typography>{t("pages.projects.listErrorMessage")}</Typography>;
      default:
        if (!projects.length) {
          return <Typography>{t("pages.projects.noProjectsMessage")}</Typography>;
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
    <Base title={t("pages.projects.title")}>
      <>
        <TabTopContainer>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setOpenNewProjectModal((prev) => !prev)}
          >
            {t("pages.projects.components.newProjectBtn")}
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
