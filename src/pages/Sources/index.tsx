import { useEffect, useState } from "react";
import { IProject, ISource, projectService, sourcesService } from "../../services";
import { Box, CircularProgress, Typography } from "@mui/material";
import { Base } from "../../layouts/Base";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectUserData } from "../../redux/authenticationSlice";
import { useParams } from "react-router-dom";
import { actionDisplayNotification } from "../../redux/notificationSlice";
import { Upload } from "../../components/Sources";
import { v4 as uuidv4 } from "uuid";
import { Card, Col, Divider, Modal, Row } from "antd";
import { ProjectOwnerManager } from "../../components/Projects/ProjectOwnerManager";
import { useWindowSize } from "../../utils/useWindowSize";
import { useTranslation } from "react-i18next";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { ShowDocumentModal } from "../../components/Sources/showDocumentModal";
import { UploadCardContainer } from "./styled";
import Meta from "antd/es/card/Meta";
import { useBetterFiles } from "./useBetterFiles";

const SourcesPage = () => {
  const { t } = useTranslation();
  const { width } = useWindowSize();
  const userData = useAppSelector(selectUserData);
  const { putIconAndExtension } = useBetterFiles();

  const [project, setProject] = useState<IProject>();
  const [sourcesList, setSourcesList] = useState<ISource[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [accessToUpload, setAccessToUpload] = useState<boolean>(false);
  const [accessToDelete, setAccessToDelete] = useState<boolean>(false);
  const [openFile, setOpenFile] = useState<false | ISource>(false);
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const isUserOwner = project?.user_owner.id === userData?.id;

  const grantedUser = async (curProject: IProject) => {
    try {
      const res = await projectService.getGrantedUsers(curProject.id);

      const findUser = res.find((user) => user.id === userData?.id);
      const userThatsHasAccessToUpload = findUser?.permissions?.includes("files:upload");
      const userThatsHasAccessToDelete = findUser?.permissions?.includes("files:delete");
      setAccessToUpload(userThatsHasAccessToUpload || isUserOwner || !!userData?.is_superuser);
      setAccessToDelete(userThatsHasAccessToDelete || isUserOwner || !!userData?.is_superuser);
    } catch (er) {
      setAccessToUpload(false);
      setAccessToDelete(false);
    }
  };

  const uploadCallback = (files: File[], paths: string[]) => {
    setSourcesList((prev) => {
      if (!prev) return;
      const newSources: ISource[] = files.map((f, index) => ({
        id: uuidv4(),
        project_id: parseInt(id as string),
        file_name: f.name,
        media_type: f.type,
        file_path: paths[index],
      }));
      return [...newSources, ...prev];
    });
  };

  const handleDelete = (filePath: string, fileName: string) => {
    Modal.confirm({
      title: t("global.confirm"),
      content: t("pages.sources.components.warning.areYouSureToDelete", { file: fileName }),
      onOk: async () => {
        try {
          setIsDeleting(true);
          const response = await sourcesService.deleteSource({
            projectId: id as string,
            sourcePath: filePath,
          });
          if (response.success) {
            dispatch(
              actionDisplayNotification({
                messages: [t("global.successDeletedMessage")],
                severity: "success",
              }),
            );
            setSourcesList((prev) => {
              if (!prev) return;
              const newSources = prev.filter((file) => file.file_path !== filePath);
              return [...newSources];
            });
          } else {
            dispatch(
              actionDisplayNotification({
                messages: [t("global.failureDeleteMessage")],
              }),
            );
          }
          setIsDeleting(false);
        } catch {
          dispatch(
            actionDisplayNotification({
              severity: "warning",
              messages: [t("global.failureDeleteMessage")],
            }),
          );
        }
      },
      cancelText: t("global.cancel"),
      okText: t("global.delete"),
    });
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await sourcesService.listSources({
        projectId: parseInt(id as string),
      });
      setSourcesList(data);
      setIsLoading(false);
      if (!id) return;
      const project = await projectService.getProject(id);
      setProject(project);
    })();
  }, [id]);

  useEffect(() => {
    if (!project) return;
    grantedUser(project);
  }, [isUserOwner, project, userData]);

  return (
    <Base title={project ? t("pages.sources.title", { project: project.title }) : "View your Data"}>
      <ShowDocumentModal
        open={!!openFile}
        file={openFile}
        projectId={project?.id}
        handleClose={() => setOpenFile(false)}
      />
      {isLoading ? (
        <Box m="auto">
          <CircularProgress sx={{ color: "#999" }} />
        </Box>
      ) : (
        <Row align="stretch" gutter={[0, 80]}>
          <Col span={width >= 1100 ? 11 : 24}>
            <Box display="flex" flexDirection="column" gap={2}>
              {accessToUpload && <Upload uploadCallback={uploadCallback} />}
              {sourcesList && !sourcesList.length ? (
                accessToUpload ? (
                  <Typography>{t("pages.sources.noFilesMessage")}</Typography>
                ) : (
                  <Typography>{t("pages.sources.noFilesAndNoPermissionMessage")}</Typography>
                )
              ) : (
                <UploadCardContainer>
                  {sourcesList &&
                    putIconAndExtension(sourcesList).map((file) => (
                      <Card
                        key={file.file_path}
                        actions={[
                          <EyeOutlined
                            key="view"
                            onClick={() => {
                              setOpenFile(file);
                            }}
                          />,
                          ...(accessToDelete
                            ? [
                                <DeleteOutlined
                                  key="delete"
                                  disabled={isDeleting}
                                  onClick={async () =>
                                    await handleDelete(file.file_path, file.file_name)
                                  }
                                />,
                              ]
                            : []),
                        ]}
                      >
                        <Meta
                          avatar={file.icon}
                          title={file.file_name}
                          description={file.media_type}
                        />
                      </Card>
                    ))}
                </UploadCardContainer>
              )}
            </Box>
          </Col>
          <Col span={width >= 1100 ? 2 : 0}>
            <Divider type="vertical" style={{ minHeight: "100%" }}></Divider>
          </Col>
          <ProjectOwnerManager project={project} span={width >= 1100 ? 11 : 24} />
        </Row>
      )}
    </Base>
  );
};

export { SourcesPage };
