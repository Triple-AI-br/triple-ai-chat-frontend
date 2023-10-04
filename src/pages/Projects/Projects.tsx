import { Base } from "../../layouts/Base";
import { useEffect, useState } from "react";
import { IProject, projectService } from "../../services";
import { Spinner } from "../../components/loaders";
import { Button, Skeleton, Tooltip, Typography } from "antd";
import { TabTopContainer } from "./styled";
import { PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { ProjectModal } from "../../components/Projects/ProjectModal";
import { ProjectsCollapses } from "../../components/Projects/ProjectsCollapses";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  selectCustomerData,
  selectUserData,
  actionUpdateCustomerInfo,
} from "../../redux/authenticationSlice";
import { actionDisplayNotification } from "../../redux/notificationSlice";

const INITIAL_PROJECT_LIMIT = {
  limit: 0,
  inUse: 0,
};

const ProjectsPage = () => {
  const { t } = useTranslation();
  const userData = useAppSelector(selectUserData);
  const customerData = useAppSelector(selectCustomerData);
  const dispatch = useAppDispatch();

  const [projects, setProjects] = useState<IProject[]>();
  const [openNewProjectModal, setOpenNewProjectModal] = useState(false);
  const [openEditProjectModal, setOpenEditProjectModal] = useState<IProject | undefined>();
  const [customerProjectsLimit, setCustomerProjectsLimit] =
    useState<typeof INITIAL_PROJECT_LIMIT>(INITIAL_PROJECT_LIMIT);
  const [loading, setLoading] = useState(true);

  const projectLimitReached =
    loading || customerProjectsLimit?.inUse >= customerProjectsLimit?.limit;

  const fetchProjects = async () => {
    try {
      const res = await projectService.listProjects();
      return res;
    } catch (err) {
      dispatch(
        actionDisplayNotification({
          messages: [t("global.failureRequestMessage")],
          severity: "error",
        }),
      );
    }
  };

  const fetchProjectLimit = async () => {
    if (!customerData?.id) return;
    await dispatch(actionUpdateCustomerInfo(customerData.id));
  };

  useEffect(() => {
    if (!userData?.id) return;
    try {
      setLoading(true);
      (async () => {
        setProjects(await fetchProjects());
        fetchProjectLimit();
        setLoading(false);
      })();
    } catch (err) {
      dispatch(
        actionDisplayNotification({
          messages: [t("global.failureRequestMessage")],
          severity: "error",
        }),
      );
      setLoading(false);
    }
  }, [userData]);

  useEffect(() => {
    if (!customerData) return;
    setCustomerProjectsLimit({
      inUse: customerData.current_number_of_projects,
      limit: customerData.limit_number_of_projects,
    });
    if (projectLimitReached && openNewProjectModal) {
      setOpenNewProjectModal(false);
    }
  }, [customerData]);

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
            loading={loading}
            // disabled={projectLimitReached}
            icon={<PlusOutlined />}
            onClick={async () => {
              if (!customerData) return;
              await dispatch(actionUpdateCustomerInfo(customerData.id));
              setOpenNewProjectModal((prev) => !prev);
            }}
          >
            {t("pages.projects.components.newProjectBtn")}
          </Button>
          {loading ? (
            <Skeleton.Button active size="small" style={{ width: "230px" }} />
          ) : (
            <div>
              {projectLimitReached ? (
                <Tooltip
                  title={t(
                    "pages.projects.components.createEditModal.limitReachedOfProjects.description",
                    {
                      projects: customerProjectsLimit.limit,
                      customer: customerData?.name,
                    },
                  )}
                >
                  <QuestionCircleOutlined
                    style={{
                      paddingRight: "5px",
                      cursor: "help",
                      color: "#fbb514",
                    }}
                  />
                </Tooltip>
              ) : null}
              <Typography.Text type={projectLimitReached ? "warning" : "secondary"}>
                {t("pages.projects.components.projectsCounter", {
                  using: customerProjectsLimit.inUse,
                  limit: customerProjectsLimit.limit,
                })}
              </Typography.Text>
            </div>
          )}
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
