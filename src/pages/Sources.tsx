import { useEffect, useState } from "react";
import { ISource, sourcesService } from "../services";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { Base } from "../layouts/Base";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectHasPermission, selectIsAdmin } from "../redux/authenticationSlice";
import { useParams } from "react-router-dom";
import { actionDisplayNotification } from "../redux/notificationSlice";
import { Upload } from "../components/Sources";
import { v4 as uuidv4 } from "uuid";
import { Col, Divider, Row } from "antd";
import { ProjectOwnerManager } from "../components/Projects/ProjectOwnerManager";
import { useWindowSize } from "../utils/useWindowSize";

const SourcesPage = () => {
  const { width } = useWindowSize();
  const isAdmin = useAppSelector(selectIsAdmin);
  const [sourcesList, setSourcesList] = useState<ISource[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const hasFileUploadPermission = useAppSelector(selectHasPermission("files:upload"));

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
    })();
  }, []);

  return (
    <Base title="View your Data">
      {isLoading ? (
        <Box m="auto">
          <CircularProgress sx={{ color: "#999" }} />
        </Box>
      ) : (
        <Row align="stretch" gutter={[0, 80]}>
          <Col span={width >= 1100 ? 11 : 24}>
            <Box display="flex" flexDirection="column" gap={2}>
              {hasFileUploadPermission && <Upload uploadCallback={uploadCallback} />}
              {sourcesList && !sourcesList.length ? (
                hasFileUploadPermission ? (
                  <Typography>
                    👆🏻 You don&apos;t have any files yet. Go ahead and upload some.
                  </Typography>
                ) : (
                  <Typography>
                    No files uplaoded yet. Ask yout admin to upload the relevant documents.
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

                        {isAdmin && (
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
          <ProjectOwnerManager projectId={id as string} span={width >= 1100 ? 11 : 24} />
        </Row>
      )}
    </Base>
  );
};

export { SourcesPage };
