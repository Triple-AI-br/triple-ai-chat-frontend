import { useEffect, useState } from "react";
import { ISource, sourcesService } from "../services";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { Base } from "../layouts/Base";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectIsAdmin } from "../redux/authenticationSlice";
import { useParams } from "react-router-dom";
import { actionDisplayNotification } from "../redux/notificationSlice";
import { Upload } from "../components/Sources";
import { v4 as uuidv4 } from "uuid";

const SourcesPage = () => {
    const isAdmin = useAppSelector(selectIsAdmin);
    const [sourcesList, setSourcesList] = useState<ISource[]>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();

    const uploadCallback = (files: File[], paths: string[]) => {
        setSourcesList(prev => {
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
                })
            );
            setSourcesList(prev => {
                if (!prev) return;
                const newSources = prev.filter(
                    file => file.file_path !== filePath
                );
                return [...newSources];
            });
        } else {
            dispatch(
                actionDisplayNotification({
                    messages: ["Error deleting source"],
                })
            );
        }
        setIsDeleting(false);
    };

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const data = await sourcesService.listSources({ projectId: 1 });
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
                <Box display="flex" flexDirection="column" gap={2}>
                    <Upload uploadCallback={uploadCallback} />

                    {sourcesList && !sourcesList.length ? (
                        <Typography>
                            👆🏻 You don&apos;t have any files yet. Go ahead and
                            upload some.
                        </Typography>
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
                                sourcesList.map(file => (
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
                                        <Typography color="#656565">
                                            {file.file_name}
                                        </Typography>

                                        {isAdmin && (
                                            <Button
                                                disabled={isDeleting}
                                                startIcon={<DeleteIcon />}
                                                variant="outlined"
                                                color="error"
                                                onClick={async () => {
                                                    await handleDelete(
                                                        file.file_path
                                                    );
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
            )}
        </Base>
    );
};

export { SourcesPage };
