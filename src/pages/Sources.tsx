import { useEffect, useState } from "react";
import { IProject, ISource, projectService, sourcesService } from "../services";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { Base } from "../layouts/Base";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectUserData } from "../redux/authenticationSlice";
import { useParams } from "react-router-dom";
import { actionDisplayNotification } from "../redux/notificationSlice";
import { Upload } from "../components/Sources";
import { v4 as uuidv4 } from "uuid";
import { Col, Divider, Row } from "antd";
import { ProjectOwnerManager } from "../components/Projects/ProjectOwnerManager";
import { useWindowSize } from "../utils/useWindowSize";

const SourcesPage = () => {
  const { width } = useWindowSize();
  const userData = useAppSelector(selectUserData);
  const [project, setProject] = useState<IProject>();
  const [sourcesList, setSourcesList] = useState<ISource[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [accessToUpload, setAccessToUpload] = useState<boolean>(false);
  const [accessToDelete, setAccessToDelete] = useState<boolean>(false);
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

  const handleDelete = async (filePath: string) => {
    if (!confirm("Are you sure you'd like to delete this source?")) return;
    setIsDeleting(true);
    const response = await sourcesService.deleteSource({
      projectId: id as string,
      sourcePath: filePath,
    });
    if (response.success) {
      dispatch(
        actionDisplayNotification({
          messages: ["Source deleted successfully"],
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
          messages: ["Error deleting source"],
        }),
      );
    }
    setIsDeleting(false);
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
    <Base title={project ? `Project: ${project.title}` : "View your Data"}>
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
                  <Typography>
                    👆🏻 You don&apos;t have any files yet. Go ahead and upload some.
                  </Typography>
                ) : (
                  <Typography>
                    No files uploaded yet. Ask yout admin to upload the relevant documents.
                  </Typography>
                )
              ) : (
                <Box
                  display="flex"
                  flexDirection="column"
                  border="1px solid #aaa"
                  borderRadius={3}
                  overflow="scroll"
                  sx={{ backgroundColor: "white" }}
                  maxHeight="70vh"
                >
                  {sourcesList &&
                    sourcesList.map((file) => (
                      <Box
                        display="flex"
                        key={file.file_path}
                        sx={{
                          borderTop: "1px solid #dedede",
                          backgroundColor: "white",
                        }}
                        p={2}
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Typography color="#656565">{file.file_name}</Typography>

                        {accessToDelete && (
                          <Button
                            disabled={isDeleting}
                            startIcon={<DeleteIcon />}
                            variant="outlined"
                            color="error"
                            onClick={async () => {
                              await handleDelete(file.file_path);
                            }}
                          >
                            Delete
                          </Button>
                        )}
                      </Box>
                    ))}
                </Box>
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
